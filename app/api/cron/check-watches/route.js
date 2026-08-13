import {Receiver} from "@upstash/qstash";
import {format, parse} from "date-fns";
import {getMovieCinemaDays} from "@/lib/pathe";
import {listWatches, deleteWatch} from "@/lib/watches";

// Pathé blocks Vercel's default Node.js function region (US). Hobby plan
// can't pin a region, so run this on the Edge runtime instead, which uses
// a different network path.
export const runtime = "edge";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});

async function sendNtfyNotification(watch) {
  const shortDate = format(parse(watch.targetDate, "yyyy-MM-dd", new Date()), "dd-MM");
  const message = `Tickets for ${watch.movieTitle} on ${shortDate} at ${watch.cinemaName} are now LIVE!`;
  const clickUrl = `https://www.pathe.nl/nl/films/${watch.movieSlug}/filters/date-${watch.targetDate}/localisation-${watch.cinemaSlug}`;

  await fetch(`https://ntfy.sh/${encodeURIComponent(watch.ntfyTopic)}`, {
    method: "POST",
    body: message,
    headers: {
      Title: "Pathé Ticket Alert!",
      Priority: "high",
      Tags: "clapper,popcorn",
      Click: clickUrl,
    },
  });
}

export async function POST(request) {
  const signature = request.headers.get("Upstash-Signature");
  const body = await request.text();

  const isValid = await receiver
    .verify({signature, body, url: request.url})
    .catch(() => false);

  if (!isValid) {
    return Response.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const today = new Date().toISOString().slice(0, 10);
    const allWatches = await listWatches();

    // Drop anything whose date has already passed so the store doesn't
    // grow unbounded — no point checking availability for a stale watch.
    const expired = allWatches.filter((watch) => watch.targetDate < today);
    for (const watch of expired) {
      await deleteWatch(watch.id);
    }

    const watches = allWatches.filter((watch) => watch.targetDate >= today);
    const watchesByMovie = new Map();
    for (const watch of watches) {
      if (!watchesByMovie.has(watch.movieSlug)) {
        watchesByMovie.set(watch.movieSlug, []);
      }
      watchesByMovie.get(watch.movieSlug).push(watch);
    }

    let notified = 0;

    for (const [movieSlug, movieWatches] of watchesByMovie) {
      const availability = await getMovieCinemaDays(movieSlug);

      for (const watch of movieWatches) {
        const isAvailable = Boolean(availability[watch.cinemaSlug]?.days?.[watch.targetDate]);
        if (isAvailable) {
          await sendNtfyNotification(watch);
          await deleteWatch(watch.id);
          notified += 1;
        }
      }
    }

    return Response.json({checked: watches.length, expired: expired.length, notified});
  } catch (error) {
    console.error("Cron check error:", error);
    return Response.json({error: "Failed to check watches"}, {status: 500});
  }
}
