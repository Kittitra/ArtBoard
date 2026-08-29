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
    const designCategory = await db.designCategory.findMany({
        where: {
            projectId
        },
        include: {
          designs: {
            select: {
              id: true,
              name: true,
              versions: true,
            }
          }
        }
    })

    if (!designCategory) {
      return Response.json({ error: "Design category not found" }, { status: 404 });
    }

    return Response.json(designCategory);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}