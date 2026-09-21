import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const project = await db.project.findMany({
            include: {
                projectMembers: true,
            }
        })

        return NextResponse.json({ project });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" });
    }
}

