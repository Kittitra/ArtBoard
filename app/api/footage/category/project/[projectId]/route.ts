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
    const footageCategories = await db.footageState.findMany({
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

    if (!footageCategories) {
      return Response.json({ error: "Footage categories not found" }, { status: 404 });
    }

    return Response.json(footageCategories);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}