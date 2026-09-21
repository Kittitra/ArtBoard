import { NextRequest } from "next/server";

// app/api/audio-proxy/route.ts
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) return new Response("Missing url", { status: 400 });

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "audio/*,*/*",
            },
            redirect: "follow",  // ← follow redirect อัตโนมัติ
        });

        if (!response.ok) {
            return new Response("Failed to fetch audio", { status: response.status });
        }

        // Google Drive อาจ return HTML confirm page ถ้าไฟล์ใหญ่
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("text/html")) {
            return new Response("Google Drive requires direct download link", { status: 422 });
        }

        const buffer = await response.arrayBuffer();

        return new Response(buffer, {
            headers: {
                "Content-Type": contentType || "audio/mpeg",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        return new Response("Error fetching audio", { status: 500 });
    }
}