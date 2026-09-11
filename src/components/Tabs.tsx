"use client";

import { useState, type ReactNode } from "react";

type Tab = { key: string; label: string; content: ReactNode };

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div>
      <div role="tablist" className="mb-8 flex gap-2 border-b border-zinc-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={tab.key === active}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-sm font-medium ${
              tab.key === active ? "border-b-2 border-black text-black" : "text-zinc-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.find((tab) => tab.key === active)?.content}
    </div>
  );
}
