import {getShows} from "@/lib/pathe";

export async function GET() {
  try {
    const shows = await getShows();
    return Response.json(shows);
  } catch (error) {
    console.error("Pathé API error:", error);
    return Response.json({error: "Failed to fetch shows"}, {status: 500});
  }
}
