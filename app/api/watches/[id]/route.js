import {deleteWatch} from "@/lib/watches";

export async function DELETE(request, {params}) {
  try {
    const {id} = await params;
    await deleteWatch(id);
    return Response.json({success: true});
  } catch (error) {
    console.error("Watches error:", error);
    return Response.json({error: "Failed to delete watch"}, {status: 500});
  }
}
