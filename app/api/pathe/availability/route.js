import {getMovieCinemaDays} from "@/lib/pathe";

// Pathé blocks Vercel's default Node.js function region (US). Hobby plan
// can't pin a region, so run this on the Edge runtime instead, which uses
// a different network path.
export const runtime = "edge";

export async function GET(request) {
  const {searchParams} = new URL(request.url);
  const movieSlug = searchParams.get("movieSlug");

  if (!movieSlug) {
    return Response.json({error: "movieSlug is required"}, {status: 400});
  }

  try {
    const availability = await getMovieCinemaDays(movieSlug);
    return Response.json(availability);
  } catch (error) {
    console.error("Pathé API error:", error);
    return Response.json({error: "Failed to fetch availability"}, {status: 500});
  }
}
