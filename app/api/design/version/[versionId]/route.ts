import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ versionId: string }> }
) {
  const { versionId } = await context.params;
    // console.log("context: ", context);
    console.log("Received versionId: ", versionId); // ✅ ตรวจสอบค่า versionId ที่ได้รับจาก URL
  try {
    const designCategory = await db.designSubClassVersion.findMany({
        where: {
            id: versionId
        }
    })

    if (!designCategory) {
      return Response.json({ error: "Design version not found" }, { status: 404 });
    }

    return Response.json(designCategory);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}