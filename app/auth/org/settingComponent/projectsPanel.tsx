"use client";

import React from "react";
import { FolderKanban, ExternalLink } from "lucide-react";
import SettingsSection from "./settingsSection";

export type OrgProject = {
  id: string;
  name: string;
  ownerName: string;
  memberCount: number;
  createdAt: string; // ISO date
  href: string;
};

type Props = {
  projects: OrgProject[];
};

export default function ProjectsPanel({ projects }: Props) {
  return (
    <SettingsSection title="Projects" description={`${projects.length} project${projects.length !== 1 ? "s" : ""} in this organization.`}>
      {projects.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-[#9b958c] text-center py-10 border border-dashed border-[#3a3733] rounded-lg">
          <FolderKanban size={22} strokeWidth={1.5} />
          <p className="text-[12.5px] m-0">No projects yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-[#322f2c] border-t border-b border-[#322f2c]">
          {projects.map((project) => (
            <li key={project.id}>
              <div
                className="group flex items-center gap-3 py-3  -mx-2 px-2 rounded-md transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-[#171615] border border-[#322f2c] flex items-center justify-center shrink-0">
                  <FolderKanban size={15} strokeWidth={1.5} className="text-[#9b958c]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm text-[#ece8e1] truncate">{project.name}</div>
                  <div className="text-xs text-[#9b958c] truncate">
                    Owned by {project.ownerName} · {project.memberCount} member{project.memberCount !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="text-xs text-[#9b958c] shrink-0 hidden sm:block">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>

              </div>
            </li>
          ))}
        </ul>
      )}
    </SettingsSection>
  );
}