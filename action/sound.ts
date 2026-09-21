'use server';

import  db  from "@/lib/db";
import Mux from "@mux/mux-node";
import { revalidatePath } from "next/cache";

// ดึง folder ทั้งหมดที่อยู่ใต้ parent เดียวกัน (folderId = undefined คือ root)
export const getSoundFoldersByParent = async (
  projectId: string,
  parentFolderId?: string
) => {
  try {
    
    const folders = await db.soundFolder.findMany({
      where: {
        projectId,
        parentFolderId: parentFolderId ?? null,
      },
      orderBy: { createdAt: "desc" },
    });
    return { soundFolders: folders };
  } catch {
    return { error: "Failed to fetch sound folders." };
  }
};

export const getFolderByFolderId = async (
  folderId: string
) => {
    try {
    
    const folder = await db.soundFolder.findUnique({
      where: {
        id: folderId
      }
    });
    return { soundFolder: folder };
  } catch {
    return { error: "Failed to fetch sound." };
  }
};

// สร้าง folder ใหม่ (รองรับ nested)
export const createNewSoundFolder = async ({
  name,
  projectId,
  parentFolderId: folderId,
  ownerId,
}: {
  name: string;
  projectId: string;
  parentFolderId?: string;
  ownerId: string;
}) => {
  try {
    // กันสร้าง folder ผิดตำแหน่ง: เช็คว่า parent folder มีจริงและอยู่ project เดียวกัน
    if (folderId) {
      const parent = await db.soundFolder.findUnique({ where: { id: folderId } });
      if (!parent || parent.projectId !== projectId) {
        return { error: "Invalid parent folder." };
      }
    }

    const soundFolder = await db.soundFolder.create({
      data: { name, projectId, parentFolderId: folderId ?? null, ownerId },
    });

    return { soundFolder, success: "Folder created." };
  } catch {
    return { error: "Failed to create sound folder." };
  }
};

// เปลี่ยนชื่อ folder
export const renameSoundFolder = async (folderId: string, name: string) => {
  try {
    const soundFolder = await db.soundFolder.update({
      where: { id: folderId },
      data: { name },
    });
    return { soundFolder, success: "Folder renamed." };
  } catch {
    return { error: "Failed to rename folder." };
  }
};

// ลบ folder (ควรเช็ค cascade หรือ folder ลูกก่อนลบ)
export const deleteSoundFolder = async (folderId: string) => {
  try {
    const children = await db.soundFolder.findMany({ where: { parentFolderId: folderId } });
    if (children.length > 0) {
      return { error: "Folder is not empty. Delete subfolders first." };
    }
    await db.soundFolder.delete({ where: { id: folderId } });
    return { success: "Folder deleted." };
  } catch {
    return { error: "Failed to delete folder." };
  }
};

// ย้าย folder ไปอยู่ใต้ parent อื่น (สำหรับ drag & drop ในอนาคต)
export const moveSoundFolder = async (folderId: string, newParentId?: string) => {
  try {
    if (folderId === newParentId) {
      return { error: "Cannot move a folder into itself." };
    }
    // TODO: เช็ค circular reference ถ้า newParentId เป็นลูกหลานของ folderId เอง
    const soundFolder = await db.soundFolder.update({
      where: { id: folderId },
      data: { parentFolderId: newParentId ?? null },
    });

    revalidatePath("/auth/project/[workspace]/sounds", "page");

    return { soundFolder, success: "Folder moved." };
  } catch {
    return { error: "Failed to move folder." };
  }
};

// sound ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createSound = async ({ 
  title,
  projectId,
  folderId,
  ownerId,
}: {
  title: string;
  projectId: string;
  folderId?: string;
  ownerId: string;
}) => {
  try {
    // เช็คว่า folder ที่จะเก็บ sound นี้มีจริงและอยู่ project เดียวกัน
    if (folderId) {
      const parent = await db.soundFolder.findUnique({ where: { id: folderId } }); // ✅ เช็คตาราง soundFolder
      if (!parent || parent.projectId !== projectId) {
        return { error: "Invalid folder." }; // ปรับข้อความให้ตรงบริบทด้วย (ไม่ใช่ "parent folder" เพราะ sound ไม่มีลูก)
      }
    }

    const sound = await db.sound.create({
      data: { title, projectId, folderId, ownerId },
    });

    return { sound, success: "Sound created." };
  } catch {
    return { error: "Failed to create sound." };
  }
}

export const getSoundByParent = async (
  projectId: string,
  parentFolderId?: string
) => {
  try {
    
    const sounds = await db.sound.findMany({
      where: {
        projectId,
        folderId: parentFolderId ?? null,
      },
      orderBy: { createdAt: "desc" },
    });
    return { sounds };
  } catch {
    return { error: "Failed to fetch sound folders." };
  }
};

export const moveSound = async (soundId: string, newParentId?: string) => {
  try {
    if (soundId === newParentId) {
      return { error: "Cannot move a sound into itself." };
    }
    // TODO: เช็ค circular reference ถ้า newParentId เป็นลูกหลานของ folderId เอง
    const sound = await db.sound.update({
      where: { id: soundId },
      data: { folderId: newParentId ?? null },
    });

    revalidatePath("/auth/project/[workspace]/sounds", "page");

    return { sound, success: "Sound moved." };
  } catch {
    return { error: "Failed to move sound." };
  }
};

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function createMuxUploadUrl() {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: process.env.NEXT_PUBLIC_APP_URL!, // เช่น https://yourapp.com
      new_asset_settings: {
        playback_policy: ["public"], // หรือ "signed" ถ้าต้องการควบคุมสิทธิ์เข้าถึง
      },
    });

    return {
      uploadUrl: upload.url,
      uploadId: upload.id, // เก็บไว้ผูกกับ SoundVersion ที่จะสร้างทีหลัง
    };
  } catch {
    return { error: "Failed to create upload URL." };
  }
}
export async function createSoundVersion({
  title,
  soundId,
  muxUploadId,
  muxPlaybackId,   // ✅ เพิ่มเข้ามา ได้มาจาก polling ตอน asset ready แล้ว
}: {
  title: string;
  soundId: string;
  muxUploadId: string;
  muxPlaybackId: string; // ✅ required เพราะรู้ค่าแล้วตอนเรียก action นี้
}) {
  try {
    const sound = await db.sound.findUnique({ where: { id: soundId } });
    if (!sound) {
      return { error: "Sound not found." };
    }

    const existingVersions = await db.soundVersion.findMany({
      where: { soundId: soundId },
    });

    const labelTaken = existingVersions.some((item) => item.title === title);
    if (labelTaken) {
      return { error: "sound version label already in use!" };
    }

    const soundVersion = await db.soundVersion.create({
      data: {
        title,
        soundId,
        muxUploadId,
        muxPlaybackId,
        status: "ready",
        versionNumber: existingVersions.length + 1,
      },
    });

    return { sound: soundVersion, success: "Version created." };
  } catch(err) {
     console.error("createSoundVersion error:", err); // ✅ ดูใน terminal ที่รัน next dev
    return { error: "Failed to create sound version." };
  }
}

export const getSoundVersionsBySoundId = async (soundId: string) => {
  if (!soundId) return [];

  try {
    const soundVersions = await db.soundVersion.findMany({
      where: { soundId },
      orderBy: { createdAt: "desc" },
    });

    return soundVersions;
  } catch (error) {
    console.error("[GET_SOUND_VERSIONS]", error);
    return [];
  }
};

export const renameSound = async (soundId: string, title: string) => {
  try {
    const sound = await db.sound.update({
      where: { id: soundId },
      data: { title },
    });
    return { sound, success: "Sound renamed." };
  } catch {
    return { error: "Failed to rename sound." };
  }
};

export const deleteSound = async (soundId: string) => {
  try {
    await db.sound.delete({ where: { id: soundId } });
    return { success: "Sound deleted." };
  } catch {
    return { error: "Failed to delete sound." };
  }
};