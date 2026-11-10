"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getProjectSettings,
  updateProjectGeneral,
  addProjectMember,
  changeProjectMemberRole,
  removeProjectMember,
  deleteProject,
} from "@/action/project";
import ProjectGeneralSettings, { ProjectGeneral } from "../../projectSettingComponent/projectGeneralSettings"; 
import ProjectMembersRoles, {
  ProjectMember,
  OrgMemberOption,
  ProjectRole,
} from "../../projectSettingComponent/projectMembersRoles";
import ProjectDangerZone, { ProjectImpactCounts } from "../../projectSettingComponent/projectDangerzone";
import Navbar from "@/app/components/Navbar";

type SettingsData = {
  general: ProjectGeneral;
  members: ProjectMember[];
  availableOrgMembers: OrgMemberOption[];
  impactCounts: ProjectImpactCounts;
};

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useCurrentUser();

  // adjust the index to wherever the project id sits in your route, e.g. /auth/project/[projectId]/settings
  const projectId = pathname.split("/")[6];

  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProjectSettings(projectId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load project settings.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return <div className="text-sm text-[#9b958c] p-6">Loading settings…</div>;
  }

  if (error || !data) {
    return <div className="text-sm text-[#c1584a] p-6">{error ?? "Project not found."}</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-6 w-full mx-auto">
      <div className="mb-10">
        <Navbar />
      </div>

      <ProjectGeneralSettings
        project={data.general}
        onSave={async (values) => {
          const result = await updateProjectGeneral(projectId, values);
          if (result.project) {
            setData((prev) => (prev ? { ...prev, general: { ...prev.general, ...values } } : prev));
          }
        }}
      />

      <ProjectMembersRoles
        members={data.members}
        availableOrgMembers={data.availableOrgMembers}
        currentUserId={user?.id ?? ""}
        onAddMember={async (userId, role) => {
          const result = await addProjectMember(projectId, userId, role as ProjectRole);
          if (result.membership) {
            const added = data.availableOrgMembers.find((m) => m.userId === userId);
            if (added) {
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      members: [
                        ...prev.members,
                        { userId, name: added.name, email: added.email, avatarUrl: null, role },
                      ],
                      availableOrgMembers: prev.availableOrgMembers.filter((m) => m.userId !== userId),
                    }
                  : prev
              );
            }
          }
        }}
        onChangeRole={async (userId, role) => {
          setData((prev) =>
            prev
              ? { ...prev, members: prev.members.map((m) => (m.userId === userId ? { ...m, role } : m)) }
              : prev
          );
          await changeProjectMemberRole(projectId, userId, role as ProjectRole);
        }}
        onRemoveMember={async (userId) => {
          const removed = data.members.find((m) => m.userId === userId);
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  members: prev.members.filter((m) => m.userId !== userId),
                  availableOrgMembers: removed
                    ? [...prev.availableOrgMembers, { userId: removed.userId, name: removed.name, email: removed.email }]
                    : prev.availableOrgMembers,
                }
              : prev
          );
          await removeProjectMember(projectId, userId);
        }}
      />

      <ProjectDangerZone
        projectName={data.general.name}
        impactCounts={data.impactCounts}
        onDelete={async () => {
          await deleteProject(projectId);
          router.push(`/auth/org/${/* your orgId here, e.g. from the loaded project if you return organizationId */ ""}`);
        }}
      />
    </div>
  );
};

export default Page;