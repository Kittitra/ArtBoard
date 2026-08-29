import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ animationId: string }> }
) {
  const { animationId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received projectId: ", projectId); // ✅ ตรวจสอบค่า projectId ที่ได้รับจาก URL
  try {
    const animation = await db.animation.findUnique({
        where: {
            id:animationId
        },
    })

    if (!animation) {
      return Response.json({ error: "Animation not found" }, { status: 404 });
    }

    return Response.json(animation);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}