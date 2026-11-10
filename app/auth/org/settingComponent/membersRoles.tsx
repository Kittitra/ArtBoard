"use client";

import React, { useState } from "react";
import { UserPlus, X, Loader2, ChevronDown } from "lucide-react";
import SettingsSection from "./settingsSection";

export type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export type Member = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
};

export type PendingInvite = {
  id: string;
  email: string;
  role: Role;
};

type Props = {
  members: Member[];
  pendingInvites?: PendingInvite[];
  currentUserId: string;
  onInvite: (email: string, role: Role) => Promise<void> | void;
  onChangeRole: (memberId: string, role: Role) => Promise<void> | void;
  onRemoveMember: (memberId: string) => Promise<void> | void;
  onRevokeInvite?: (inviteId: string) => Promise<void> | void;
};

const ROLES: Role[] = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];

export default function MembersRoles({
  members,
  pendingInvites = [],
  currentUserId,
  onInvite,
  onChangeRole,
  onRemoveMember,
  onRevokeInvite,
}: Props) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("MEMBER");
  const [inviting, setInviting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      await onInvite(inviteEmail.trim(), inviteRole);
      setInviteEmail("");
      setInviteRole("MEMBER");
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (memberId: string, role: Role) => {
    setBusyId(memberId);
    try {
      await onChangeRole(memberId, role);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (memberId: string) => {
    setBusyId(memberId);
    try {
      await onRemoveMember(memberId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <SettingsSection title="Members & roles" description="Manage who has access to this organization.">
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="name@company.com"
          className="flex-1 bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 placeholder:text-[#9b958c] focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
        />
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value as Role)}
          className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
        >
          {ROLES.filter((r) => r !== "OWNER").map((r) => (
            <option key={r} value={r}>
              {roleLabel(r)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleInvite}
          disabled={inviting || !inviteEmail.trim()}
          className="flex items-center justify-center gap-1.5 bg-[#e8a33d] text-[#201a0d] text-[13px] font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {inviting ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} strokeWidth={2} />}
          Invite
        </button>
      </div>

      <ul className="divide-y divide-[#322f2c] border-t border-b border-[#322f2c]">
        {members.map((member) => {
          const isSelf = member.id === currentUserId;
          const isBusy = busyId === member.id;
          return (
            <li key={member.id} className="flex items-center gap-3 py-3">
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
                <div className="relative">
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                    disabled={isBusy}
                    className="appearance-none bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-xs rounded-md pl-2.5 pr-7 py-1.5 disabled:opacity-50"
                  >
                    {ROLES.filter((r) => r !== "OWNER").map((r) => (
                      <option key={r} value={r}>
                        {roleLabel(r)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9b958c] pointer-events-none" />
                </div>
              )}

              {member.role !== "OWNER" && (
                <button
                  type="button"
                  onClick={() => handleRemove(member.id)}
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

      {pendingInvites.length > 0 && (
        <div className="mt-5">
          <h3 className="text-[12.5px] text-[#9b958c] mb-2">Pending invites</h3>
          <ul className="divide-y divide-[#322f2c] border-t border-b border-[#322f2c]">
            {pendingInvites.map((invite) => (
              <li key={invite.id} className="flex items-center gap-3 py-2.5">
                <div className="min-w-0 flex-1 text-sm text-[#9b958c] truncate">{invite.email}</div>
                <span className="text-xs text-[#9b958c] px-2 py-1 border border-[#3a3733] rounded-full">
                  {roleLabel(invite.role)}
                </span>
                {onRevokeInvite && (
                  <button
                    type="button"
                    onClick={() => onRevokeInvite(invite.id)}
                    aria-label="Revoke invite"
                    className="text-[#9b958c] hover:text-[#c1584a] hover:bg-[#c1584a]/10 p-1.5 rounded-md"
                  >
                    <X size={14} strokeWidth={2} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SettingsSection>
  );
}

function roleLabel(role: Role) {
  switch (role) {
    case "OWNER":
      return "Owner";
    case "ADMIN":
      return "Admin";
    case "MEMBER":
      return "Member";
    case "VIEWER":
      return "Viewer";
  }
}