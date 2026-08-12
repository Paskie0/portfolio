import {getCinemas} from "@/lib/pathe";

// Pathé blocks requests from non-EU cloud IPs; pin this function to run
// close to the Netherlands instead of Vercel's default US region.
export const preferredRegion = "fra1";

export async function GET() {
  try {
    const cinemas = await getCinemas();
    return Response.json(cinemas);
  } catch (error) {
    console.error("Pathé API error:", error);
    return Response.json({error: "Failed to fetch cinemas"}, {status: 500});
  }
}
