import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received projectId: ", projectId); // ✅ ตรวจสอบค่า projectId ที่ได้รับจาก URL
  try {
    const animationCategories = await db.animationState.findMany({
        where: {
            projectId
        },
        // include: {
        //     animations: {
        //             select: {
        //             id: true,
        //             name: true,
        //         }
        //     }
        // }
    })

    if (!animationCategories) {
      return Response.json({ error: "Animation categories not found" }, { status: 404 });
    }

    return Response.json(animationCategories);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}