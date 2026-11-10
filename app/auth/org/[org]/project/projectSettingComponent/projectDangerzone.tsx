"use client";

import React, { useState } from "react";
import { Trash2, Loader2, X } from "lucide-react";
import SettingsSection from "../../../settingComponent/settingsSection";

export type ProjectImpactCounts = {
  assets: number;
  storyboards: number;
  scripts: number;
};

type Props = {
  projectName: string;
  impactCounts: ProjectImpactCounts;
  onDelete: () => Promise<void> | void;
};

export default function ProjectDangerZone({ projectName, impactCounts, onDelete }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const canConfirm = confirmText === projectName;
  const totalItems = impactCounts.assets + impactCounts.storyboards + impactCounts.scripts;

  const handleDelete = async () => {
    if (!canConfirm) return;
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <SettingsSection
      title="Danger zone"
      description="Deleting this project removes everything inside it permanently."
      tone="danger"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="text-[12.5px] text-[#9b958c] max-w-md">
          This will permanently delete <span className="text-[#ece8e1]">{projectName}</span>, including{" "}
          {impactCounts.assets} asset{impactCounts.assets !== 1 ? "s" : ""},{" "}
          {impactCounts.storyboards} storyboard{impactCounts.storyboards !== 1 ? "s" : ""}, and{" "}
          {impactCounts.scripts} script{impactCounts.scripts !== 1 ? "s" : ""}. This cannot be undone.
        </div>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-1.5 bg-transparent border border-[#c1584a] text-[#c1584a] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#c1584a]/10 transition shrink-0"
        >
          <Trash2 size={14} strokeWidth={2} />
          Delete project
        </button>
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => !deleting && setConfirmOpen(false)}
        >
          <div
            className="bg-[#242220] border border-[#3a3733] rounded-xl p-5 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#ece8e1]">Delete {projectName}?</h3>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                aria-label="Close"
                className="text-[#9b958c] hover:text-[#ece8e1] disabled:opacity-50"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <p className="text-[12.5px] text-[#9b958c] mb-3">
              {totalItems > 0 ? (
                <>
                  <span className="text-[#c1584a] font-medium">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>{" "}
                  will be permanently deleted along with the project.
                </>
              ) : (
                "This project has no assets, storyboards, or scripts yet."
              )}{" "}
              Type <span className="text-[#ece8e1] font-medium">{projectName}</span> to confirm.
            </p>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={projectName}
              className="w-full bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 mb-4 placeholder:text-[#4a4641] focus-visible:outline-2 focus-visible:outline-[#c1584a]"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="text-[13px] text-[#9b958c] hover:text-[#ece8e1] px-3 py-2 rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!canConfirm || deleting}
                className="flex items-center gap-1.5 bg-[#c1584a] text-[#1c1b1a] text-[13px] font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsSection>
  );
}