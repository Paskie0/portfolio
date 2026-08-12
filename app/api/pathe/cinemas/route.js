import {getCinemas} from "@/lib/pathe";

export async function GET() {
  try {
    const cinemas = await getCinemas();
    return Response.json(cinemas);
  } catch (error) {
    console.error("Pathé API error:", error);
    return Response.json({error: "Failed to fetch cinemas"}, {status: 500});
  }
}
