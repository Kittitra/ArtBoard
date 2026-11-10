"use client";

import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import SettingsSection from "./settingsSection";

export type OrganizationGeneral = {
  id: string;
  name: string;
  // slug: string;
  logoUrl: string | null;
  timezone: string;
};

type Props = {
  organization: OrganizationGeneral;
  onSave: (data: { name: string; timezone: string }) => Promise<void> | void;
  onLogoChange?: (file: File) => Promise<void> | void;
};

const TIMEZONES = [
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Tokyo",
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
];

export default function GeneralSettings({ organization, onSave, onLogoChange }: Props) {
  const [name, setName] = useState(organization.name);
  // const [slug, setSlug] = useState(organization.slug);
  const [timezone, setTimezone] = useState(organization.timezone);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(organization.logoUrl);

  // const isDirty = name !== organization.name || slug !== organization.slug || timezone !== organization.timezone;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ name, timezone });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoPick = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
    onLogoChange?.(file);
  };

  return (
    <SettingsSection title="General" description="Basic information about your organization.">
      <div className="flex items-center gap-4 mb-5">
        <label className="relative w-16 h-16 rounded-xl bg-[#171615] border border-[#322f2c] flex items-center justify-center overflow-hidden cursor-pointer shrink-0">
          {logoPreview ? (
            <img src={logoPreview} alt="Organization logo" className="w-full h-full object-cover" />
          ) : (
            <Upload size={18} strokeWidth={1.5} className="text-[#9b958c]" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoPick(e.target.files?.[0])}
          />
        </label>
        <div className="text-[12.5px] text-[#9b958c]">
          PNG or JPG, at least 128×128px.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Organization name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          />
        </Field>

        {/* <Field label="URL slug">
          <div className="flex items-center bg-[#2c2a27] border border-[#322f2c] rounded-md overflow-hidden focus-within:outline-2 focus-within:outline-[#e8a33d]">
            <span className="text-[#9b958c] text-sm pl-3">app.yoursite.com/</span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              className="flex-1 bg-transparent text-[#ece8e1] text-sm py-2 pr-3 outline-none min-w-0"
            />
          </div>
        </Field> */}

        <Field label="Timezone">
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-sm rounded-md px-3 py-2 focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="button"
          disabled={saving}
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[12.5px] text-[#9b958c] mb-1.5">{label}</span>
      {children}
    </label>
  );
}