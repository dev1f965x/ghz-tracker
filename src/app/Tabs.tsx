"use client";

import { useState, type ReactNode } from "react";

export default function Tabs({ chores, news }: { chores: ReactNode; news: ReactNode }) {
  const [tab, setTab] = useState<"chores" | "news">("chores");

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-zinc-200">
        <button
          onClick={() => setTab("chores")}
          className={`px-4 py-2 text-sm font-medium ${
            tab === "chores" ? "border-b-2 border-black text-black" : "text-zinc-400"
          }`}
        >
          숙제
        </button>
        <button
          onClick={() => setTab("news")}
          className={`px-4 py-2 text-sm font-medium ${
            tab === "news" ? "border-b-2 border-black text-black" : "text-zinc-400"
          }`}
        >
          소식
        </button>
      </div>
      {tab === "chores" ? chores : news}
    </div>
  );
}
