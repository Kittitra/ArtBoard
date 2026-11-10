"use client";

import React, { useState } from "react";
import { UserPlus, X, Loader2, ChevronDown, Info } from "lucide-react";
import SettingsSection from "../../../settingComponent/settingsSection";

export type ProjectRole = "OWNER" | "PRODUCER" | "DIRECTOR" | "DEPARTMENT_LEAD" | "MEMBER";

export type ProjectMember = {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: ProjectRole;
};

export type OrgMemberOption = {
  userId: string;
  name: string;
  email: string;
};

type Props = {
  members: ProjectMember[];
  // org members not yet on this project, for the "add" dropdown
  availableOrgMembers: OrgMemberOption[];
  currentUserId: string;
  onAddMember: (userId: string, role: ProjectRole) => Promise<void> | void;
  onChangeRole: (userId: string, role: ProjectRole) => Promise<void> | void;
  onRemoveMember: (userId: string) => Promise<void> | void;
};

const ROLES: ProjectRole[] = ["OWNER", "PRODUCER", "DIRECTOR", "DEPARTMENT_LEAD", "MEMBER"];

const ROLE_INFO: Record<ProjectRole, { label: string; description: string }> = {
  OWNER: { label: "Owner", description: "Full control, including deleting the project." },
  PRODUCER: { label: "Producer", description: "Manages budget, scheduling, and production logistics." },
  DIRECTOR: { label: "Director", description: "Oversees creative direction across all departments." },
  DEPARTMENT_LEAD: { label: "Department lead", description: "Manages a specific department's assets and workflow." },
  MEMBER: { label: "Member", description: "Can view and contribute within their assigned scope." },
};

export default function ProjectMembersRoles({
  members,
  availableOrgMembers,
  currentUserId,
  onAddMember,
  onChangeRole,
  onRemoveMember,
}: Props) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<ProjectRole>("MEMBER");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!selectedUserId) return;
    setAdding(true);
    try {
      await onAddMember(selectedUserId, selectedRole);
      setSelectedUserId("");
      setSelectedRole("MEMBER");
    } finally {
      setAdding(false);
    }
  };

  const handleRoleChange = async (userId: string, role: ProjectRole) => {
    setBusyId(userId);
    try {
      await onChangeRole(userId, role);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (userId: string) => {
    setBusyId(userId);
    try {
      await onRemoveMember(userId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <SettingsSection title="Members & roles" description="Who's working on this project, and what they can do.">
      {availableOrgMembers.length > 0 ? (
        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="flex-1 bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          >
            <option value="">Select someone from the organization…</option>
            {availableOrgMembers.map((m) => (
              <option key={m.userId} value={m.userId}>
                {m.name} — {m.email}
              </option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as ProjectRole)}
            className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          >
            {ROLES.filter((r) => r !== "OWNER").map((r) => (
              <option key={r} value={r}>
                {ROLE_INFO[r].label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={adding || !selectedUserId}
            className="flex items-center justify-center gap-1.5 bg-[#e8a33d] text-[#201a0d] text-[13px] font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} strokeWidth={2} />}
            Add
          </button>
        </div>
      ) : (
        <p className="text-[12.5px] text-[#9b958c] mb-5">
          Everyone in the organization is already on this project.
        </p>
      )}

      <ul className="divide-y divide-[#322f2c] border-t border-b border-[#322f2c]">
        {members.map((member) => {
          const isSelf = member.userId === currentUserId;
          const isBusy = busyId === member.userId;
          return (
            <li key={member.userId} className="flex items-center gap-3 py-3">
              <div className="w-8 h-8 rounded-full bg-[#171615] border border-[#322f2c] flex items-center justify-center overflow-hidden shrink-0">
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] text-[#9b958c] font-semibold">
                    {member.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm text-[#ece8e1] truncate">
                  {member.name} {isSelf && <span className="text-[#9b958c] text-xs">(you)</span>}
                </div>
                <div className="text-xs text-[#9b958c] truncate">{member.email}</div>
              </div>

              {member.role === "OWNER" ? (
                <span className="text-xs text-[#e8a33d] font-medium px-2 py-1">Owner</span>
              ) : (
                <div className="group relative">
                  <div className="relative">
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.userId, e.target.value as ProjectRole)}
                      disabled={isBusy}
                      className="appearance-none bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-xs rounded-md pl-2.5 pr-7 py-1.5 disabled:opacity-50"
                    >
                      {ROLES.filter((r) => r !== "OWNER").map((r) => (
                        <option key={r} value={r}>
                          {ROLE_INFO[r].label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9b958c] pointer-events-none" />
                  </div>
                  <div className="absolute right-0 top-full mt-1 w-56 bg-[#2c2a27] border border-[#3a3733] rounded-md p-2 text-[11px] text-[#9b958c] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                    {ROLE_INFO[member.role].description}
                  </div>
                </div>
              )}

              {member.role !== "OWNER" && (
                <button
                  type="button"
                  onClick={() => handleRemove(member.userId)}
                  disabled={isBusy}
                  aria-label={`Remove ${member.name}`}
                  className="text-[#9b958c] hover:text-[#c1584a] hover:bg-[#c1584a]/10 p-1.5 rounded-md disabled:opacity-50"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-start gap-2 mt-4 text-[11.5px] text-[#9b958c]">
        <Info size={13} strokeWidth={1.75} className="mt-0.5 shrink-0" />
        <span>Hover a role to see what it can do. Only people already in the organization can be added here.</span>
      </div>
    </SettingsSection>
  );
}