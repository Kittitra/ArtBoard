import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; folderId?: string }> }
) {
  const { projectId, folderId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received projectId: ", projectId); // ✅ ตรวจสอบค่า projectId ที่ได้รับจาก URL
  try {
    const footageCategories = await db.soundFolder.findMany({
        where: {
            projectId,
            folderId: folderId ?? null, // null = root level
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
      return Response.json({ error: "Sound folders not found" }, { status: 404 });
    }

    return Response.json(footageCategories);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}