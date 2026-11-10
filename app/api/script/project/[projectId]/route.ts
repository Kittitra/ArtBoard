import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }  // ← เปลี่ยน type เป็น Promise
) {
  const { projectId } = await params;  // ← await ก่อน

  try {
    const script = await db.script.findMany({
      where: { asset: { projectId } },  // ← ใช้ id ที่ได้จาก await
    });

    if (!script) {
      return Response.json({ error: "Script not found" }, { status: 404 });
    }

    return Response.json(script);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}