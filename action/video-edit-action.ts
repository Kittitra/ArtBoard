"use server";

import { Mux } from "@mux/mux-node";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import db from "@/lib/db"; // adjust to your actual prisma client path
import fs from "fs";
import os from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

interface VideoSegment {
  start: number;
  end: number;
  speed: number; // per-segment speed multiplier
}

interface EditParams {
  footageId: string;
  sourcePlaybackId: string;
  sourceMp4Filename: string; // e.g. "capped-1080p.mp4" - from ensureMp4Rendition()
  label: string;
  segments: VideoSegment[]; // sorted, non-overlapping, kept ranges - each with its own speed
}

// atempo filter only supports 0.5x - 2.0x, chain multiple stages for values outside that range
function buildAtempoChain(speed: number): string {
  const stages: number[] = [];
  let remaining = speed;
  while (remaining > 2) {
    stages.push(2);
    remaining /= 2;
  }
  while (remaining < 0.5) {
    stages.push(0.5);
    remaining /= 0.5;
  }
  stages.push(remaining);
  return stages.map((s) => `atempo=${s.toFixed(3)}`).join(",");
}

// Builds a single filter_complex graph that trims each kept segment (applying
// that segment's own speed) and concatenates them back together in order.
// E.g. segments = [{0, 10, speed:1}, {20, 30, speed:2}] skips 10-20 entirely
// and plays 20-30 at double speed.
function buildFilterComplex(segments: VideoSegment[]): string {
  const parts: string[] = [];

  segments.forEach((seg, i) => {
    let vChain = `[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS`;
    if (seg.speed !== 1) vChain += `,setpts=${(1 / seg.speed).toFixed(4)}*PTS`;
    parts.push(`${vChain}[v${i}]`);

    let aChain = `[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS`;
    if (seg.speed !== 1) aChain += `,${buildAtempoChain(seg.speed)}`;
    parts.push(`${aChain}[a${i}]`);
  });

  const concatInputs = segments.map((_, i) => `[v${i}][a${i}]`).join("");
  parts.push(`${concatInputs}concat=n=${segments.length}:v=1:a=1[outv][outa]`);

  return parts.join(";");
}

async function downloadFile(url: string, destPath: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download source video: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

function runFfmpeg(inputPath: string, outputPath: string, segments: VideoSegment[]) {
  return new Promise<void>((resolve, reject) => {
    const filterComplex = buildFilterComplex(segments);

    ffmpeg(inputPath)
      .complexFilter(filterComplex)
      .outputOptions(["-map", "[outv]", "-map", "[outa]"])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}

async function uploadToMux(filePath: string) {
  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      static_renditions: [{ resolution: "highest" }],
    },
    cors_origin: "*",
  });

  if(!upload.url) {
    throw new Error("API_URL is not defined");
  }

  const fileBuffer = fs.readFileSync(filePath);
  const putRes = await fetch(upload.url, { method: "PUT", body: fileBuffer });
  if (!putRes.ok) throw new Error(`Mux upload failed: ${putRes.status}`);

  let assetId: string | undefined;
  let playbackId: string | undefined;
  const maxAttempts = 30;
  for (let i = 0; i < maxAttempts; i++) {
    const uploadStatus = await mux.video.uploads.retrieve(upload.id);
    if (uploadStatus.asset_id) {
      assetId = uploadStatus.asset_id;
      const asset = await mux.video.assets.retrieve(assetId);
      if (asset.status === "ready" && asset.playback_ids?.[0]?.id) {
        playbackId = asset.playback_ids[0].id;
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  if (!playbackId || !assetId) {
    throw new Error("Timed out waiting for Mux asset to be ready");
  }

  return { assetId, playbackId, uploadId: upload.id };
}

export async function createEditedFootageVersion(params: EditParams) {
  const { footageId, label, segments } = params;

  if (!segments || segments.length === 0) {
    return { error: "At least one segment is required" };
  }
  for (const seg of segments) {
    if (seg.end <= seg.start) {
      return { error: "Each segment's end must be after its start" };
    }
    if (!seg.speed || seg.speed <= 0) {
      return { error: "Each segment must have a valid speed" };
    }
  }

  const existing = await db.footageVersion.findFirst({
    where: { footageId, label },
  });
  if (existing) {
    return { error: "Label already in use" };
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-edit-"));
  const inputPath = path.join(tmpDir, "input.mp4");
  const outputPath = path.join(tmpDir, "output.mp4");

  try {
    const sourceUrl = `https://stream.mux.com/${params.sourcePlaybackId}/${params.sourceMp4Filename}`;
    await downloadFile(sourceUrl, inputPath);
    await runFfmpeg(inputPath, outputPath, segments);

    const { playbackId, uploadId } = await uploadToMux(outputPath);

    const videoVersion = await db.footageVersion.create({
      data: {
        label,
        footageId,
        muxUploadId: uploadId,
        muxPlaybackId: playbackId,
        thumbnailUrl: `https://image.mux.com/${playbackId}/thumbnail.jpg`,
        versionNumber: (await db.footageVersion.count({ where: { footageId } })) + 1,
      },
    });

    return { videoVersion };
  } catch (err) {
    console.error("createEditedFootageVersion failed:", err);
    return { error: "Failed to process video" };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}