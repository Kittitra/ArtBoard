// app/api/mux/asset/[uploadId]/route.ts
import { NextRequest } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ uploadId: string }> }
) {
    const { uploadId } = await params;

    const upload = await mux.video.uploads.retrieve(uploadId);
    const assetId = upload.asset_id;

    if (!assetId) {
        return Response.json({ status: "processing" });
    }

    const asset = await mux.video.assets.retrieve(assetId);
    const playbackId = asset.playback_ids?.[0]?.id;

    return Response.json({
        status: asset.status,
        playbackId,
        thumbnailUrl: playbackId
            ? `https://image.mux.com/${playbackId}/thumbnail.jpg`
            : null,
    });
}