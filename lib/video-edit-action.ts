"use server";

import { Mux } from "@mux/mux-node";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import db from "@/lib/db";
import fs from "fs";
import os from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

interface EditParams {
  footageId: string;
  sourcePlaybackId: string;
  label: string;
  trimStart: number;
  trimEnd: number;
  speed: number;
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

async function downloadFile(url: string, destPath: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download source video: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

function runFfmpeg(inputPath: string, outputPath: string, params: EditParams) {
  return new Promise<void>((resolve, reject) => {
    let command = ffmpeg(inputPath)
      .setStartTime(params.trimStart)
      .setDuration(params.trimEnd - params.trimStart);

    if (params.speed !== 1) {
      command = command
        .videoFilters(`setpts=${(1 / params.speed).toFixed(4)}*PTS`)
        .audioFilters(buildAtempoChain(params.speed));
    }

    command
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}

async function uploadToMux(filePath: string) {
  // 1. Create a direct upload
    const upload = await mux.video.uploads.create({
    new_asset_settings: {
        playback_policy: ["public"],
        mp4_support: "capped-1080p", // เปลี่ยนจาก "standard"
    },
    cors_origin: "*",
    });

  if (!upload.url) {
        throw new Error("API_URL is not defined");
    }

  // 2. PUT the processed file to the upload URL
  const fileBuffer = fs.readFileSync(filePath);
  const putRes = await fetch(upload.url, {
    method: "PUT",
    body: fileBuffer,
  });
  if (!putRes.ok) throw new Error(`Mux upload failed: ${putRes.status}`);

  // 3. Poll until the asset is ready (simple approach - swap for a webhook in production)
  let assetId: string | undefined;
  let playbackId: string | undefined;
  const maxAttempts = 30; // ~60s at 2s interval, adjust for your typical clip length
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
  const { footageId, sourcePlaybackId, label, trimStart, trimEnd } = params;

  if (trimEnd <= trimStart) {
    return { error: "Trim end must be after trim start" };
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
    const sourceUrl = `https://stream.mux.com/${sourcePlaybackId}/high.mp4`;
    await downloadFile(sourceUrl, inputPath);
    await runFfmpeg(inputPath, outputPath, params);

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