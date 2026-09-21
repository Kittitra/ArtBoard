"use server";

import { Mux } from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

const RENDITION_NAME_STATIC = "highest.mp4";

interface RenditionFile {
  name?: string;
  [key: string]: unknown;
}

interface NormalizedRenditions {
  status?: string; // "ready" | "preparing" | "disabled" | "errored" - lives at this wrapper level, NOT per-file
  files: RenditionFile[];
}

// The @mux/mux-node type for `asset.static_renditions` is inconsistent across
// SDK versions/API modes:
// - legacy mp4_support assets: { status: "ready", files: [{ name, width, height, ... }] }
//   (status is on the WRAPPER, individual files have no status field of their own)
// - static_renditions API assets: may come back as a flat array of
//   { id, status, name, resolution, ... } with status per-item
// Normalize both into one shape so the caller doesn't need to care which one it is.
function normalizeRenditions(asset: any): NormalizedRenditions {
  const raw = asset?.static_renditions;
  if (!raw) return { files: [] };

  if (Array.isArray(raw)) {
    // static_renditions API shape - each item carries its own status
    return {
      status: raw.every((r) => r.status === "ready") ? "ready" : undefined,
      files: raw,
    };
  }

  // legacy mp4_support shape - status is on the wrapper object
  return {
    status: raw.status,
    files: Array.isArray(raw.files) ? raw.files : [],
  };
}

// mp4_support: "standard" produces low.mp4 / medium.mp4 / high.mp4
// mp4_support: "capped-1080p" produces capped-1080p.mp4
function legacyFilenameFor(mp4Support: string): string {
  if (mp4Support === "capped-1080p") return "capped-1080p.mp4";
  return "high.mp4"; // "standard"
}

// Call this when the user clicks "Edit" - before opening VideoEditModal.
// Returns the filename to use in the mp4 URL once the rendition is ready.
export async function ensureMp4Rendition(playbackId: string) {
  const playbackInfo = await mux.video.playbackIds.retrieve(playbackId);
  const assetId = playbackInfo.object.id;

  let asset: any = await mux.video.assets.retrieve(assetId);

  // Mux won't allow the static_renditions API on an asset that already has
  // legacy mp4_support enabled - branch based on what's already set.
  const mp4Support: string | undefined = asset.mp4_support;
  const usingLegacy = !!mp4Support && mp4Support !== "none";
  const targetName = usingLegacy ? legacyFilenameFor(mp4Support!) : RENDITION_NAME_STATIC;

  let normalized = normalizeRenditions(asset);
  let existingFile = normalized.files.find((f) => f.name === targetName);

  if (existingFile && normalized.status === "ready") {
    return { filename: targetName };
  }
  if (normalized.status === "errored") {
    return { error: "MP4 rendition previously failed to generate" };
  }

  if (!existingFile) {
    if (usingLegacy) {
      await mux.video.assets.updateMP4Support(assetId, {
        mp4_support: mp4Support as any,
      });
    } else {
      await mux.video.assets.createStaticRendition(assetId, {
        resolution: "highest",
      });
    }
  }

  // Poll until ready. Rendition generation time scales with video length,
  // so for long clips consider moving this to a webhook
  // (video.asset.static_rendition.ready) instead of polling.
  const maxAttempts = 40; // ~80s at 2s interval
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    asset = await mux.video.assets.retrieve(assetId);
    normalized = normalizeRenditions(asset);
    const file = normalized.files.find((f) => f.name === targetName);

    if (file && normalized.status === "ready") {
      return { filename: targetName };
    }
    if (normalized.status === "errored") {
      return { error: "Failed to generate MP4 rendition" };
    }
  }

  return { error: "Timed out waiting for MP4 rendition" };
}