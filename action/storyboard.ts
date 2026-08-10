
'use server';

import  db  from "@/lib/db";
import Mux from "@mux/mux-node";
import { revalidatePath } from "next/cache";

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
  try {
    const newStoryboard = await db.storyboard.create({
        data: {
            title,
            projectId,
            ownerId,
        },
    });
    revalidatePath(`/auth/project/${projectId}/storyboard`);
    return { newStoryboard, success: "Storyboard created successfully." };
  } catch {
    return { error: "Failed to create storyboard." };
  }
};
