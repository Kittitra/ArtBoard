import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ stateId: string }> }
) {
  const { stateId } = await context.params;
    // console.log("context: ", context);
    // console.log("Received stateId: ", stateId); // ✅ ตรวจสอบค่า stateId ที่ได้รับจาก URL
  try {
    const edited = await db.edited.findMany({
        where: {
            stateId
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

    if (!edited) {
      return Response.json({ error: "Edited not found" }, { status: 404 });
    }

    return Response.json(edited);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}