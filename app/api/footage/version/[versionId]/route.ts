import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ footageId: string }> }
) {
  const { footageId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received projectId: ", projectId); // ✅ ตรวจสอบค่า projectId ที่ได้รับจาก URL
  try {
    const footageVersions = await db.footageVersion.findMany({
        where: {
            footageId
        },
        // include: {
        //     animation: {
        //         select: {
        //             id: true,
        //             name: true,
        //         }
        //     }
        // }
    })

    if (!footageVersions) {
      return Response.json({ error: "Footage version not found" }, { status: 404 });
    }

    return Response.json(footageVersions);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}