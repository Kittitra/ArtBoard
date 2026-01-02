// app/api/link-preview/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    // 🔒 basic sanitize
    const targetUrl = url.startsWith("http")
      ? url
      : `https://${url}`;

    // 🌐 fetch webpage
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page");
    }

    const html = await res.text();

    // 🧠 extract meta tags
    const getMeta = (property: string) => {
    // ลองหลายรูปแบบ
        const patterns = [
            new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
            new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
            new RegExp(`<meta[^>]+property=${property}[^>]+content=["']([^"']+)["']`, "i"),
        ];

        for (const regex of patterns) {
            const match = html.match(regex);
            if (match && match[1]) return match[1];
        }

        return null;
    };

    const getMetaByName = (name: string) => {
      const regex = new RegExp(
        `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`,
        "i"
      );
      const match = html.match(regex);
      return match ? match[1] : null;
    };

    const title =
      getMeta("og:title") ||
      html.match(/<title>(.*?)<\/title>/i)?.[1] ||
      null;

    const description =
      getMeta("og:description") ||
      getMetaByName("description");

    const image = getMeta("og:image");

    return NextResponse.json({
      title,
      description,
      image,
      url: targetUrl,
    });
  } catch (err) {
    console.error("link-preview error:", err);

    return NextResponse.json(
      { error: "Preview fetch failed" },
      { status: 500 }
    );
  }
}
