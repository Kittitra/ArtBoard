import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const script = await db.script.findMany({
      where: {
       ownerId: params.userId
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