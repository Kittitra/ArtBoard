import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const projects = await db.project.findMany({
      where: {
        projectMembers: {
          some: {
            userId: params.userId, // 👈 key หลัก
          },
        },
      },
      include: {
        projectMembers: {
          where: {
            userId: params.userId, // 👈 เอาเฉพาะ role ของ user นี้
          },
          select: {
            role: true,
          },
        },
        scripts: true,
      },
    });

    return Response.json(projects);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}