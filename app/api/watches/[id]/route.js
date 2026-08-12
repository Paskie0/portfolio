import {getWatch, deleteWatch} from "@/lib/watches";
import {getVisitorId} from "@/lib/visitor";

export const runtime = "edge";

export async function DELETE(request, {params}) {
  try {
    const {id} = await params;
    const visitorId = await getVisitorId();
    const watch = await getWatch(id);

    if (watch && watch.visitorId !== visitorId) {
      return Response.json({error: "Not found"}, {status: 404});
    }

    await deleteWatch(id);
    return Response.json({success: true});
  } catch (error) {
    console.error("Watches error:", error);
    return Response.json({error: "Failed to delete watch"}, {status: 500});
  }
}
