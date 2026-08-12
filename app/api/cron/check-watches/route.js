import {getMovieCinemaDays} from "@/lib/pathe";
import {listWatches, deleteWatch} from "@/lib/watches";

async function sendNtfyNotification(watch) {
  const message = `Tickets for ${watch.movieTitle} on ${watch.targetDate} at ${watch.cinemaName} are now LIVE!`;

  await fetch(`https://ntfy.sh/${encodeURIComponent(watch.ntfyTopic)}`, {
    method: "POST",
    body: message,
    headers: {
      Title: "Pathé Ticket Alert!",
      Priority: "high",
      Tags: "clapper,popcorn",
    },
  });
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({error: "Unauthorized"}, {status: 401});
  }

  try {
    const watches = await listWatches();
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

    return Response.json({checked: watches.length, notified});
  } catch (error) {
    console.error("Cron check error:", error);
    return Response.json({error: "Failed to check watches"}, {status: 500});
  }
}
