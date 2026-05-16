import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ← เปลี่ยน type เป็น Promise
) {
  const { id } = await params;  // ← await ก่อน

  try {
    const project = await db.project.findUnique({
      where: { id },  // ← ใช้ id ที่ได้จาก await
      include: {
        projectMembers: {
          include: {
            user: true,
          },
        },
        scripts: true,
      },
    });

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(project);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}