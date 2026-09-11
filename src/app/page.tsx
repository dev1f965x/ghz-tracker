import ChoreBoard, { DAY_STRIP_LENGTH } from "@/components/ChoreBoard";
import NewsList from "@/components/NewsList";
import Tabs from "@/components/Tabs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [chores, news] = await Promise.all([
    prisma.chore.findMany({
      orderBy: { createdAt: "asc" },
      include: { completions: { orderBy: { date: "desc" }, take: DAY_STRIP_LENGTH } },
    }),
    prisma.news.findMany({ orderBy: { date: "asc" } }),
  ]);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="mb-1 text-2xl font-semibold">GHZ 트래커</h1>
      <p className="mb-8 text-sm text-zinc-500">
        원신 · 붕괴: 스타레일 · 젠레스 존 제로 — 숙제와 소식을 한곳에서 관리하세요.
      </p>
      <Tabs
        tabs={[
          { key: "chores", label: "숙제", content: <ChoreBoard chores={chores} /> },
          { key: "news", label: "소식", content: <NewsList news={news} /> },
        ]}
      />
    </main>
  );
}
