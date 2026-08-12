import {getMovieCinemaDays} from "@/lib/pathe";

// Pathé blocks requests from non-EU cloud IPs; pin this function to run
// close to the Netherlands instead of Vercel's default US region.
export const preferredRegion = "fra1";

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
