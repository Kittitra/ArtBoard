import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const script = await db.script.findMany({
      where: {
       projectId: params.projectId
      },
    });

    return Response.json(script);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch script" },
      { status: 500 }
    );
  }
}