"use server";

import * as z from "zod"
import { ScriptSchema } from "@/schemas";
import db from "@/lib/db";
import { revalidatePath } from "next/cache"
import { ScriptStatus } from "@/app/generated/prisma";

export const createDraft = async (values: z.infer<typeof ScriptSchema>) => {
    const validateFields = ScriptSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { title, userId, projectId } = validateFields.data;

    const exitDraft = await db.script.findFirst({
        where: {
            title,
            ownerId: userId,
            projectId
        }
    })

    if (exitDraft) {
        return {error: "Script already exists!"};
    }

    const newDraft = await db.script.create({
        data: {
            title,
            ownerId: userId,
            projectId
        }
    })

    return {success: "Create Script Success", script: newDraft}
}

export async function createScript(data: {
  title: string
  content: any
  userId: string
}) {
  const scenes = data.content?.content
    ?.filter((block: any) => block.type === "sceneHeading")
    .map((block: any, index: number) => ({
      sceneNumber: index + 1,
      heading: block.content?.[0]?.text ?? "",
    })) ?? []

  const script = await db.script.create({
    data: {
      title: data.title,
      content: data.content,
      ownerId: data.userId,
      scenes: {
        create: scenes,
      },
      revisions: {
        create: {
          content: data.content,
          version: 1,
          note: "Initial save",
        },
      },
    },
  })

  revalidatePath("/editor")
  return script
}

// อัปเดต Script
export async function updateScript(data: {
  id: string
  title?: string
  content?: any
  description?: string
  author?: string
  status?: ScriptStatus
  projectId?: string
}) {
  const current = await db.script.findUnique({
    where: { id: data.id },
    select: { version: true, content: true },
  })

  if (!current) throw new Error("Script not found")

  const scenes = data.content?.content
    ?.filter((block: any) => block.type === "sceneHeading")
    .map((block: any, index: number) => ({
      sceneNumber: index + 1,
      heading: block.content?.[0]?.text ?? "",
    })) ?? []

  const script = await db.script.update({
    where: { id: data.id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.content && { content: data.content }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.author !== undefined && { author: data.author }),
      ...(data.status && { status: data.status }),
      ...(data.projectId !== undefined && { projectId: data.projectId }),
      version: { increment: 1 },
      ...(data.content && {
        scenes: {
          deleteMany: {},
          create: scenes,
        },
      }),
    },
  })

  revalidatePath("/editor")
  return JSON.parse(JSON.stringify(script))
}

// โหลด Script
export async function getScript(id: string) {
  return await db.script.findUnique({
    where: { id },
    include: {
      scenes: { orderBy: { sceneNumber: "asc" } },
    },
  })
}

// โหลดรายการ Script ทั้งหมด
export async function getScripts(userId: string) {
  return await db.script.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      version: true,
      updatedAt: true,
    },
  })
}

// // ดู Revision ทั้งหมด
// export async function getRevisions(scriptId: string) {
//   return await db.revision.findMany({
//     where: { scriptId },
//     orderBy: { version: "desc" },
//   })
// }

// // Restore กลับไป revision ที่ต้องการ
// export async function restoreRevision(revisionId: string) {
//   const revision = await db.revision.findUnique({
//     where: { id: revisionId },
//   })

//   if (!revision) throw new Error("Revision not found")

//   return await updateScript({
//     id: revision.scriptId,
//     content: revision.content,
//   })
// }

// ลบ Script
export async function deleteScript(id: string) {
  await db.script.delete({ where: { id } })
  revalidatePath("/editor")
}