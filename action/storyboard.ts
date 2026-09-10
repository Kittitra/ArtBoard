
'use server';

import { CameraMovement, ShotType } from "@/app/generated/prisma";
import  db  from "@/lib/db";
import Mux from "@mux/mux-node";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary"

// import type { ShotType, CameraMovement } from "@prisma/client";

export const getStoryboardByProjectId = async (
  projectId: string
) => {
  try {
    const storyboards = await db.storyboard.findMany({
      where: {
        projectId,
      },
      orderBy: { createdAt: "desc" },
    });
    return { storyboards };
  } catch {
    return { error: "Failed to fetch storyboards." };
  }
};

export const createNewStoryboard = async ({
  title,
  projectId,
  ownerId,
}: {
  title: string;
  projectId: string;
    ownerId: string;
}) => {

  const exitingStoryboard = await db.storyboard.findFirst({
    where: {
      title,
      projectId,
    },
  });

  if(exitingStoryboard?.title === title){
    return { error: "Storyboard name already exists." };
  }
  
  try {
    const newStoryboard = await db.storyboard.create({
        data: {
            title,
            projectId,
        },
    });
    revalidatePath(`/auth/project/${projectId}/storyboard`);
    return { newStoryboard, success: "Storyboard created successfully." };
  } catch {
    return { error: "Failed to create storyboard." };
  }
};


const shotInclude = {
  frame: true,
  scene: { select: { id: true, sceneNumber: true, heading: true } },
} as const;

// ---------------------------------------------------------------------------
// READ
// ---------------------------------------------------------------------------

export async function getStoryboard(storyboardId: string) {
  // TODO: auth check — confirm the current session owns the parent project
  // const session = await getServerSession(authOptions);
  // if (!session) throw new Error("Unauthorized");

  const storyboard = await db.storyboard.findUniqueOrThrow({
    where: { id: storyboardId },
    include: {
      shots: {
        orderBy: { order: "asc" },
        include: shotInclude,
      },
    },
  });

  return storyboard;
}

export type StoryboardWithShots = Awaited<ReturnType<typeof getStoryboard>>;
export type ShotWithRelations = StoryboardWithShots["shots"][number];

// ---------------------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------------------

export async function createShot(storyboardId: string, afterShotId?: string | null) {
  const siblings = await db.shot.findMany({
    where: { storyboardId },
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });

  const order = nextOrder(siblings, afterShotId ?? null);

  const shot = await db.shot.create({
    data: {
      storyboardId,
      order,
      shotType: "WIDE",
      cameraMovement: "STATIC",
    },
    include: shotInclude,
  });

  revalidatePath(`/storyboards/${storyboardId}`);
  return shot;
}

// ---------------------------------------------------------------------------
// UPDATE
// ---------------------------------------------------------------------------

export async function updateShot(
  shotId: string,
  data: Partial<{
    shotType: ShotType | null;
    cameraMovement: CameraMovement | null;
    description: string | null;
    dialogue: string | null;
    duration: number | null;
    sceneId: string | null;
  }>
) {
  const shot = await db.shot.update({
    where: { id: shotId },
    data,
    include: shotInclude,
  });

  revalidatePath(`/storyboards/${shot.storyboardId}`);
  return shot;
}

// Move `shotId` to sit immediately before `beforeShotId` (pass null to move to the end).
export async function reorderShot(params: {
  storyboardId: string;
  shotId: string;
  beforeShotId: string | null;
}) {
  const { storyboardId, shotId, beforeShotId } = params;

  const siblings = await db.shot.findMany({
    where: { storyboardId, id: { not: shotId } },
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });

  const order = nextOrder(siblings, beforeShotId, { insertBefore: true });

  await db.shot.update({ where: { id: shotId }, data: { order } });
  revalidatePath(`/storyboards/${storyboardId}`);
  return order;
}

// Attach an already-uploaded image asset (e.g. a Cloudinary public ID/URL) to a shot's frame.
export async function attachFrameImage(shotId: string, imageAssetId: string) {
  const frame = await db.frame.upsert({
    where: { shotId },
    create: { shotId, imageAssetId },
    update: { imageAssetId, videoAssetId: null },
  });
  return frame;
}

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------

export async function deleteShot(shotId: string) {
  const shot = await db.shot.delete({ where: { id: shotId } });
  revalidatePath(`/storyboards/${shot.storyboardId}`);
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const ORDER_STEP = 1000;

/**
 * Fractional-index helper. Given siblings sorted ascending by `order`:
 * - insertBefore: false (default) → place the new item right AFTER `anchorId` (or at the end if null)
 * - insertBefore: true            → place the new item right BEFORE `anchorId` (or at the end if null)
 */
function nextOrder(
  siblings: { id: string; order: number }[],
  anchorId: string | null,
  opts: { insertBefore?: boolean } = {}
) {
  if (anchorId === null) {
    const last = siblings[siblings.length - 1];
    return last ? last.order + ORDER_STEP : ORDER_STEP;
  }

  const anchorIndex = siblings.findIndex((s) => s.id === anchorId);
  if (anchorIndex === -1) {
    const last = siblings[siblings.length - 1];
    return last ? last.order + ORDER_STEP : ORDER_STEP;
  }

  if (opts.insertBefore) {
    const next = siblings[anchorIndex];
    const prev = siblings[anchorIndex - 1];
    if (!prev) return next.order / 2;
    return (prev.order + next.order) / 2;
  }

  const prev = siblings[anchorIndex];
  const next = siblings[anchorIndex + 1];
  if (!next) return prev.order + ORDER_STEP;
  return (prev.order + next.order) / 2;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBufferToCloudinary(buffer: Buffer): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "storyboard-frames" },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// เรียกจาก client: ส่ง FormData ที่มี field "file"
export async function uploadFrameImage(shotId: string, formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided");

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadBufferToCloudinary(buffer);

  return attachFrameImage(shotId, uploaded.secure_url);
}