import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const scripts = await db.script.findMany();

        return NextResponse.json({ scripts });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch scripts" });
    }
}