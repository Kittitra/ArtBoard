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
    const footage = await db.footage.findMany({
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

    if (!footage) {
      return Response.json({ error: "Footage not found" }, { status: 404 });
    }

    return Response.json(footage);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}