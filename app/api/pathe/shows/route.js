import {getShows} from "@/lib/pathe";

// Pathé blocks Vercel's default Node.js function region (US). Hobby plan
// can't pin a region, so run this on the Edge runtime instead, which uses
// a different network path.
export const runtime = "edge";

export async function GET() {
  try {
    const shows = await getShows();
    return Response.json(shows);
  } catch (error) {
    console.error("Pathé API error:", error);
    return Response.json({error: "Failed to fetch shows"}, {status: 500});
  }
}
