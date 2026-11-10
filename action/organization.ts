"use server";

import db from "@/lib/db"
import { OrganizationSchema } from "@/schemas"
import * as z from "zod"
import { Role } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

export const createOrganization = async (value: z.infer<typeof OrganizationSchema>) => {
    const validateFields = OrganizationSchema.safeParse(value);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { name, ownerId } = value
    try{
        const newOrg = await db.organization.create({
            data: {
                name,
                members: {
                    create: {
                        userId: ownerId,
                        role:"OWNER"
                    }
                }
            },
            include: {
                members: true
            }
        })

        return {success: "create organization success", org: newOrg}
    }catch(err){
        console.log(err)
    }
}

export const getOrganizationByUserId = async (userId: string) => {
    try {
        const orgData = await db.organization.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                members: true
            }
        });

        return orgData;
    } catch (error) {
        console.log(error);
        return [];
    }
};


export async function getOrganizationSettings(organizationId: string) {
  const organization = await db.organization.findUniqueOrThrow({
    where: { id: organizationId },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
        orderBy: { role: "asc" },
      },
      invites: { orderBy: { createdAt: "desc" } },
      projects: {
        include: {
          members: {
            include: { user: { select: { name: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
 
  return {
    general: {
      id: organization.id,
      name: organization.name,
      // slug: organization.slug,
      logoUrl: organization.logoUrl,
      timezone: organization.timezone,
    },
    members: organization.members.map((m) => ({
      id: m.id,
      name: m.user.name ?? m.user.email,
      email: m.user.email,
      avatarUrl: m.user.image ?? null,
      role: m.role,
    })),
    pendingInvites: organization.invites.map((i) => ({
      id: i.id,
      email: i.email,
      role: i.role,
    })),
    projects: organization.projects.map((p) => {
      const owner = p.members.find((m) => m.role === "OWNER");
      return {
        id: p.id,
        name: p.name,
        ownerName: owner?.user.name ?? "Unassigned",
        memberCount: p.members.length,
        createdAt: p.createdAt.toISOString(),
        href: `/auth/project/${p.id}`,
      };
    }),
  };
}
 
// ---------------------------------------------------------------------------
// GENERAL
// ---------------------------------------------------------------------------
 
export async function updateOrgGeneral(
  organizationId: string,
  data: { name: string; timezone: string }
) {
  // const slugTaken = await db.organization.findFirst({
  //   where: { slug: data.slug, NOT: { id: organizationId } },
  //   select: { id: true },
  // });
  // if (slugTaken) return { error: "That URL slug is already taken." };
 
  const organization = await db.organization.update({
    where: { id: organizationId },
    data,
  });
 
  revalidatePath(`/auth/org/${organizationId}/settings`);
  return { organization };
}
 
export async function updateOrgLogo(organizationId: string, logoUrl: string) {
  const organization = await db.organization.update({
    where: { id: organizationId },
    data: { logoUrl },
  });
  revalidatePath(`/auth/org/${organizationId}/settings`);
  return organization;
}
 
// ---------------------------------------------------------------------------
// MEMBERS & ROLES
// ---------------------------------------------------------------------------
 
export async function inviteMember(organizationId: string, email: string, role: Role) {
  const existingMember = await db.membership.findFirst({
    where: { organizationId, user: { email } },
  });
  if (existingMember) return { error: "This person is already a member." };
 
  const existingInvite = await db.invite.findUnique({
    where: { email_organizationId: { email, organizationId } },
  });
  if (existingInvite) return { error: "An invite is already pending for this email." };
 
  const invite = await db.invite.create({
    data: { organizationId, email, role },
  });
 
  // TODO: send the actual invite email here
 
  revalidatePath(`/auth/org/${organizationId}/settings`);
  return { invite };
}
 
export async function revokeInvite(inviteId: string) {
  const invite = await db.invite.delete({ where: { id: inviteId } });
  revalidatePath(`/auth/org/${invite.organizationId}/settings`);
}
 
export async function changeMemberRole(membershipId: string, role: Role) {
  const membership = await db.membership.findUniqueOrThrow({ where: { id: membershipId } });
 
  if (membership.role === "OWNER") {
    return { error: "Transfer ownership separately before changing this role." };
  }
 
  const updated = await db.membership.update({
    where: { id: membershipId },
    data: { role },
  });
 
  revalidatePath(`/auth/org/${membership.organizationId}/settings`);
  return { membership: updated };
}
 
export async function removeMember(membershipId: string) {
  const membership = await db.membership.findUniqueOrThrow({ where: { id: membershipId } });
 
  if (membership.role === "OWNER") {
    return { error: "The organization owner can't be removed." };
  }
 
  await db.membership.delete({ where: { id: membershipId } });
  revalidatePath(`/auth/org/${membership.organizationId}/settings`);
  return { success: true };
}
 
// ---------------------------------------------------------------------------
// DANGER ZONE
// ---------------------------------------------------------------------------
 
export async function deleteOrganization(organizationId: string) {
  // TODO: auth check — only an OWNER should be able to call this
  await db.organization.delete({ where: { id: organizationId } });
  // no revalidatePath — the page is about to be gone; redirect from the client after this resolves
}