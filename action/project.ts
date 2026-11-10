"use server";

import * as z from "zod";
import db from "@/lib/db";
import { ProjectSchema } from "@/schemas";
import { Role, ProjectRole } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
  const validateFields = ProjectSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "invalid field!" };
  }

  const { name, orgId, ownerId } = validateFields.data;

  const newProject = await db.project.create({
    data: { name, organizationId: orgId, ownerId },
  });

  return { success: "Create Project Success", project: newProject };
};

export const getProjectByOrgId = async (orgId: string) => {
  try {
    const orgData = await db.project.findMany({
      where: { organizationId: orgId },
    });
    return orgData;
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------------------------------
// READ — one call that feeds every section of the project settings page
// ---------------------------------------------------------------------------

export const getProjectsWithAccess = async (orgId: string, userId: string) => {
  try {
    const projects = await db.project.findMany({
      where: { organizationId: orgId },
      include: {
        members: { where: { userId }, select: { role: true } },
      },
    });
 
    return projects.map(({ members, ...project }) => ({
      ...project,
      isMember: members.length > 0,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function getProjectSettings(projectId: string) {
  const project = await db.project.findUniqueOrThrow({
    where: { id: projectId },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
      },
    },
  });

  // people already on the org that aren't on this project yet
  const orgMemberships = await db.membership.findMany({
    where: { organizationId: project.organizationId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  const projectUserIds = new Set(project.members.map((m) => m.userId));
  const availableOrgMembers = orgMemberships
    .filter((m) => !projectUserIds.has(m.userId))
    .map((m) => ({ userId: m.userId, name: m.user.name ?? m.user.email, email: m.user.email }));

  const [assetCount, storyboardCount, scriptCount] = await Promise.all([
    db.asset.count({ where: { projectId, type: { notIn: ["STORYBOARD", "SCRIPT"] } } }),
    db.storyboard.count({ where: { asset: { projectId } } }),
    db.script.count({ where: { asset: { projectId } } }),
  ]);

  return {
    general: {
      id: project.id,
      name: project.name,
      description: project.description,
    },
    members: project.members.map((m) => ({
      userId: m.userId,
      name: m.user.name ?? m.user.email,
      email: m.user.email,
      avatarUrl: m.user.image ?? null,
      role: m.role,
    })),
    availableOrgMembers,
    impactCounts: {
      assets: assetCount,
      storyboards: storyboardCount,
      scripts: scriptCount,
    },
  };
}

// ---------------------------------------------------------------------------
// GENERAL
// ---------------------------------------------------------------------------

export async function updateProjectGeneral(
  projectId: string,
  data: { name: string; description: string }
) {
  const project = await db.project.update({
    where: { id: projectId },
    data,
  });

  revalidatePath(`/auth/project/${projectId}/settings`);
  return { project };
}

// ---------------------------------------------------------------------------
// MEMBERS & ROLES
// ---------------------------------------------------------------------------

export async function addProjectMember(projectId: string, userId: string, role: ProjectRole) {
  const existing = await db.userProject.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });
  if (existing) return { error: "This person is already on the project." };

  const membership = await db.userProject.create({
    data: { projectId, userId, role },
    include: { user: { select: { name: true, email: true, image: true } } },
  });

  revalidatePath(`/auth/project/${projectId}/settings`);
  return { membership };
}

export async function changeProjectMemberRole(projectId: string, userId: string, role: ProjectRole) {
  const current = await db.userProject.findUniqueOrThrow({
    where: { userId_projectId: { userId, projectId } },
  });

  if (current.role === "OWNER") {
    return { error: "Transfer ownership separately before changing this role." };
  }

  const updated = await db.userProject.update({
    where: { userId_projectId: { userId, projectId } },
    data: { role },
  });

  revalidatePath(`/auth/project/${projectId}/settings`);
  return { membership: updated };
}

export async function removeProjectMember(projectId: string, userId: string) {
  const current = await db.userProject.findUniqueOrThrow({
    where: { userId_projectId: { userId, projectId } },
  });

  if (current.role === "OWNER") {
    return { error: "The project owner can't be removed." };
  }

  await db.userProject.delete({ where: { userId_projectId: { userId, projectId } } });
  revalidatePath(`/auth/project/${projectId}/settings`);
  return { success: true };
}

// ---------------------------------------------------------------------------
// DANGER ZONE
// ---------------------------------------------------------------------------

export async function deleteProject(projectId: string) {
  // TODO: auth check — only an OWNER of this project should be able to call this
  await db.project.delete({ where: { id: projectId } });
  // no revalidatePath — the page is about to be gone; redirect from the client after this resolves
}