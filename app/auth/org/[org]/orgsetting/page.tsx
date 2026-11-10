"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getOrganizationSettings,
  updateOrgGeneral,
  updateOrgLogo,
  inviteMember,
  changeMemberRole,
  removeMember,
  revokeInvite,
  deleteOrganization,
} from "@/action/organization";
import GeneralSettings, { OrganizationGeneral } from "../../settingComponent/generalSettings";
import MembersRoles, { Member, PendingInvite, Role } from "../../settingComponent/membersRoles";
import ProjectsPanel, { OrgProject } from "../../settingComponent/projectsPanel";
import DangerZone from "../../settingComponent/dangerzone";
import Navbar from "@/app/components/Navbar";


type SettingsData = {
  general: OrganizationGeneral;
  members: Member[];
  pendingInvites: PendingInvite[];
  projects: OrgProject[];
};

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useCurrentUser();

  // adjust the index to wherever the org id sits in your route, e.g. /auth/org/[orgId]/settings
  const organizationId = pathname.split("/")[3];

  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organizationId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getOrganizationSettings(organizationId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load organization settings.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [organizationId]);

  if (loading) {
    return <div className="text-sm text-[#9b958c] p-6">Loading settings…</div>;
  }

  if (error || !data) {
    return <div className="text-sm text-[#c1584a] p-6">{error ?? "Organization not found."}</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-6 w-full mx-auto">
      <div className="mb-10"> 
        <Navbar />
      </div>
    
      <GeneralSettings
        organization={data.general}
        onSave={async (values) => {
          const result = await updateOrgGeneral(organizationId, values);
          if (result.organization) {
            setData((prev) => (prev ? { ...prev, general: { ...prev.general, ...values } } : prev));
          }
        }}
        onLogoChange={async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          // swap for your real upload-then-attach flow, mirroring attachFrameImage in the storyboard actions
          // const uploaded = await uploadOrgLogoFile(organizationId, formData);
          // await updateOrgLogo(organizationId, uploaded.secure_url);
        }}
      />

      <MembersRoles
        members={data.members}
        pendingInvites={data.pendingInvites}
        currentUserId={user?.id ?? ""}
        onInvite={async (email, role) => {
          const result = await inviteMember(organizationId, email, role as Role);
          if (result.invite) {
            setData((prev) =>
              prev
                ? { ...prev, pendingInvites: [...prev.pendingInvites, { id: result.invite!.id, email, role }] }
                : prev
            );
          }
        }}
        onChangeRole={async (memberId, role) => {
          setData((prev) =>
            prev
              ? { ...prev, members: prev.members.map((m) => (m.id === memberId ? { ...m, role } : m)) }
              : prev
          );
          await changeMemberRole(memberId, role as Role);
        }}
        onRemoveMember={async (memberId) => {
          setData((prev) =>
            prev ? { ...prev, members: prev.members.filter((m) => m.id !== memberId) } : prev
          );
          await removeMember(memberId);
        }}
        onRevokeInvite={async (inviteId) => {
          setData((prev) =>
            prev ? { ...prev, pendingInvites: prev.pendingInvites.filter((i) => i.id !== inviteId) } : prev
          );
          await revokeInvite(inviteId);
        }}
      />

      <ProjectsPanel projects={data.projects} />

      <DangerZone
        organizationName={data.general.name}
        onDelete={async () => {
          await deleteOrganization(organizationId);
          router.push("/auth/organizations");
        }}
      />
    </div>
  );
};

export default Page;