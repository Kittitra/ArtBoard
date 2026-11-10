import React from "react";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  tone?: "default" | "danger";
};

export default function SettingsSection({ title, description, children, tone = "default" }: Props) {
  const borderClass = tone === "danger" ? "border-[#c1584a]/40" : "border-[#322f2c]";

  return (
    <section className={`bg-[#242220] border ${borderClass} rounded-xl p-5`}>
      <header className="mb-4">
        <h2 className={`text-[15px] font-semibold ${tone === "danger" ? "text-[#c1584a]" : "text-[#ece8e1]"}`}>
          {title}
        </h2>
        {description && <p className="text-[12.5px] text-[#9b958c] mt-1">{description}</p>}
      </header>
      {children}
    </section>
  );
}