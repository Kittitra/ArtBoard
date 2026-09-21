import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ footageId: string }> }
) {
  const { footageId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received footageId: ", footageId); // ✅ ตรวจสอบค่า footageId ที่ได้รับจาก URL
  try {
    const footage = await db.footage.findUnique({
        where: {
            id:footageId
        },
    })

    if (!footage) {
      return Response.json({ error: "Footage not found" }, { status: 404 });
    }

    return Response.json(footage);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}