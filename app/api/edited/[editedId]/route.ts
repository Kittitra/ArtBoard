import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ editedId: string }> }
) {
  const { editedId } = await context.params;

  try {
    const edited = await db.edited.findUnique({
        where: {
            id:editedId
        },
    })

    if (!edited) {
      return Response.json({ error: "Edited not found" }, { status: 404 });
    }

    return Response.json(edited);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}