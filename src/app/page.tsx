import { prisma } from "@/lib/prisma";
import { buildDayStrip, intervalLabel, isDoneThisCycle } from "@/lib/cycle";
import { formatDDay } from "@/lib/date";
import { GAMES, GAME_LABELS } from "@/lib/games";
import { addChore, deleteChore, completeChore, addNews, deleteNews } from "./actions";
import Tabs from "./Tabs";

export const dynamic = "force-dynamic";

const DAY_STRIP_LENGTH = 14;

const TYPE_STYLES: Record<string, string> = {
  방송: "bg-purple-100 text-purple-700",
  PV: "bg-blue-100 text-blue-700",
  업데이트: "bg-green-100 text-green-700",
  이벤트: "bg-amber-100 text-amber-700",
};

export default async function Home() {
  const chores = await prisma.chore.findMany({
    orderBy: [{ createdAt: "asc" }],
    include: {
      completions: {
        orderBy: { date: "desc" },
        take: DAY_STRIP_LENGTH,
      },
    },
  });
  const news = await prisma.news.findMany({ orderBy: { date: "asc" } });

  const choresSection = (
    <div>
      <form action={addChore} className="mb-8 flex flex-wrap gap-2">
        <select name="game" defaultValue={GAMES[0]} className="rounded border border-zinc-300 px-2 py-2 text-sm">
          {GAMES.map((game) => (
            <option key={game} value={game}>
              {GAME_LABELS[game]}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="할 일 이름"
          required
          className="flex-1 rounded border border-zinc-300 px-3 py-2"
        />
        <select name="intervalDays" defaultValue="1" className="rounded border border-zinc-300 px-2 py-2 text-sm">
          <option value="1">매일</option>
          <option value="3">3일마다</option>
          <option value="7">매주</option>
          <option value="14">2주마다</option>
          <option value="30">매월</option>
        </select>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          추가
        </button>
      </form>

      <div className="flex flex-col gap-6">
        {GAMES.map((game) => {
          const gameChores = chores.filter((c) => c.game === game);
          return (
            <div key={game} className="rounded border border-zinc-200 p-4">
              <h2 className="mb-3 font-semibold">{GAME_LABELS[game]}</h2>
              <ul className="flex flex-col gap-2">
                {gameChores.map((chore) => {
                  const done = isDoneThisCycle(chore.lastDoneAt, chore.intervalDays);
                  const strip = buildDayStrip(
                    chore.completions.map((c) => c.date),
                    DAY_STRIP_LENGTH,
                  );

                  return (
                    <li key={chore.id} className="rounded bg-zinc-50 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">{chore.name}</span>
                          <span className="ml-2 text-xs text-zinc-400">
                            {intervalLabel(chore.intervalDays)} · 🔥 {chore.streak}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <form action={completeChore.bind(null, chore.id)}>
                            <button
                              type="submit"
                              disabled={done}
                              className={`rounded px-2 py-1 text-xs ${done ? "bg-green-100 text-green-700" : "bg-zinc-200 hover:bg-zinc-300"}`}
                            >
                              {done ? "완료 ✓" : "완료"}
                            </button>
                          </form>
                          <form action={deleteChore.bind(null, chore.id)}>
                            <button type="submit" className="text-xs text-zinc-400 hover:text-red-500">
                              ✕
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="mt-2 flex gap-1">
                        {strip.map((day) => (
                          <span
                            key={day.date}
                            title={day.date}
                            className={`h-3 w-3 rounded-sm ${day.done ? "bg-green-500" : "bg-zinc-200"}`}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
                {gameChores.length === 0 && (
                  <li className="rounded border border-dashed border-zinc-300 py-4 text-center text-xs text-zinc-400">
                    등록된 할 일이 없습니다.
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );

  const newsSection = (
    <div>
      <form action={addNews} className="mb-8 flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          <select name="game" defaultValue={GAMES[0]} className="rounded border border-zinc-300 px-3 py-2">
            {GAMES.map((game) => (
              <option key={game} value={game}>
                {GAME_LABELS[game]}
              </option>
            ))}
          </select>
          <select name="type" defaultValue="업데이트" className="rounded border border-zinc-300 px-3 py-2">
            <option value="방송">방송</option>
            <option value="PV">PV</option>
            <option value="업데이트">업데이트</option>
            <option value="이벤트">이벤트</option>
          </select>
          <input type="text" name="title" placeholder="제목" required className="rounded border border-zinc-300 px-3 py-2" />
          <input type="date" name="date" required className="rounded border border-zinc-300 px-3 py-2" />
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            name="url"
            placeholder="링크 (선택, 방송/PV 영상 등)"
            className="flex-1 rounded border border-zinc-300 px-3 py-2"
          />
          <button type="submit" className="rounded bg-black px-4 py-2 text-white">
            추가
          </button>
        </div>
      </form>

      <ul className="flex flex-col gap-3">
        {news.map((n) => (
          <li key={n.id} className="flex items-center justify-between rounded border border-zinc-200 px-4 py-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[n.type] ?? "bg-zinc-100 text-zinc-700"}`}>
                  {n.type}
                </span>
                <p className="font-medium">
                  {GAME_LABELS[n.game]} —{" "}
                  {n.url ? (
                    <a href={n.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                      {n.title}
                    </a>
                  ) : (
                    n.title
                  )}
                </p>
              </div>
              <p className="text-sm text-zinc-500">
                {n.date.toISOString().slice(0, 10)} · {formatDDay(n.date)}
              </p>
            </div>
            <form action={deleteNews.bind(null, n.id)}>
              <button type="submit" className="text-sm text-zinc-400 hover:text-red-500">
                삭제
              </button>
            </form>
          </li>
        ))}
        {news.length === 0 && (
          <li className="rounded border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-400">
            아직 등록된 소식이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="mb-1 text-2xl font-semibold">GHZ 트래커</h1>
      <p className="mb-8 text-sm text-zinc-500">
        원신 · 붕괴: 스타레일 · 젠레스 존 제로 — 숙제와 소식을 한곳에서 관리하세요.
      </p>
      <Tabs chores={choresSection} news={newsSection} />
    </div>
  );
}
