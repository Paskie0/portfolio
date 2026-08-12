import {getMovieCinemaDays} from "@/lib/pathe";
import {listWatches, createWatch} from "@/lib/watches";
import {getVisitorId} from "@/lib/visitor";

// POST calls Pathé's API for validation, which blocks Vercel's default
// Node.js function region (US). Hobby plan can't pin a region, so run this
// on the Edge runtime instead, which uses a different network path.
export const runtime = "edge";

export async function GET() {
  try {
    const visitorId = await getVisitorId();
    const today = new Date().toISOString().slice(0, 10);
    const watches = await listWatches();
    const ownWatches = watches.filter((watch) => watch.visitorId === visitorId && watch.targetDate >= today);
    return Response.json(ownWatches);
  } catch (error) {
    console.error("Watches error:", error);
    return Response.json({error: "Failed to fetch watches"}, {status: 500});
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {cinemaSlug, cinemaName, movieSlug, movieTitle, targetDate, ntfyTopic} = body;

    if (!cinemaSlug || !cinemaName || !movieSlug || !movieTitle || !targetDate || !ntfyTopic) {
      return Response.json({error: "Missing required fields"}, {status: 400});
    }

    const today = new Date().toISOString().slice(0, 10);
    if (targetDate <= today) {
      return Response.json({error: "targetDate must be in the future"}, {status: 400});
    }

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (targetDate > maxDate.toISOString().slice(0, 10)) {
      return Response.json({error: "targetDate must be within 3 months from today"}, {status: 400});
    }

    const availability = await getMovieCinemaDays(movieSlug);
    if (availability[cinemaSlug]?.days?.[targetDate]) {
      return Response.json({error: "That date is already showing at this cinema"}, {status: 400});
    }

    const visitorId = await getVisitorId();
    const watch = {
      id: crypto.randomUUID(),
      visitorId,
      cinemaSlug,
      cinemaName,
      movieSlug,
      movieTitle,
      targetDate,
      ntfyTopic,
      createdAt: new Date().toISOString(),
    };

    await createWatch(watch);

    return Response.json(watch, {status: 201});
  } catch (error) {
    console.error("Watches error:", error);
    return Response.json({error: "Failed to create watch"}, {status: 500});
  }
}
