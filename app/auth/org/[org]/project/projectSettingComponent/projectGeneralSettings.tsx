"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import SettingsSection from "../../../settingComponent/settingsSection";
import { Button } from "@/components/ui/button";

export type ProjectGeneral = {
  id: string;
  name: string;
  description: string | null;
};

type Props = {
  project: ProjectGeneral;
  onSave: (data: { name: string; description: string }) => Promise<void> | void;
};

export default function ProjectGeneralSettings({ project, onSave }: Props) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? "");
  const [saving, setSaving] = useState(false);

  const isDirty = name !== project.name || description !== (project.description ?? "");

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ name, description });
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection title="General" description="Basic information about this project.">
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-[12.5px] text-[#9b958c] mb-1.5">Project name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          />
        </label>

        <div>
          <Button className="p-3 font-normal cursor-pointer">
            Calendar
          </Button>
        </div>

        <label className="block">
          <span className="block text-[12.5px] text-[#9b958c] mb-1.5">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What's this project about?"
            className="w-full bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 resize-none placeholder:text-[#9b958c] focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          />
        </label>
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="button"
          disabled={!isDirty || saving}
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#e8a33d] text-[#201a0d] text-[13px] font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          Save changes
        </button>
      </div>
    </SettingsSection>
  );
}