import { addChore, completeChore, deleteChore } from "@/app/actions";
import type { Chore, Completion } from "@/generated/prisma/client";
import { buildDayStrip, INTERVALS, intervalLabel, isDoneThisCycle } from "@/lib/cycle";
import { GAME_LABELS, GAMES } from "@/lib/games";

export const DAY_STRIP_LENGTH = 14;

type ChoreWithCompletions = Chore & { completions: Completion[] };

export default function ChoreBoard({ chores }: { chores: ChoreWithCompletions[] }) {
  return (
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
          {INTERVALS.map((interval) => (
            <option key={interval.days} value={interval.days}>
              {interval.label}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          추가
        </button>
      </form>

      <div className="flex flex-col gap-6">
        {GAMES.map((game) => {
          const gameChores = chores.filter((chore) => chore.game === game);
          return (
            <section key={game} className="rounded border border-zinc-200 p-4">
              <h2 className="mb-3 font-semibold">{GAME_LABELS[game]}</h2>
              <ul className="flex flex-col gap-2">
                {gameChores.map((chore) => (
                  <ChoreRow key={chore.id} chore={chore} />
                ))}
                {gameChores.length === 0 && (
                  <li className="rounded border border-dashed border-zinc-300 py-4 text-center text-xs text-zinc-400">
                    등록된 할 일이 없습니다.
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ChoreRow({ chore }: { chore: ChoreWithCompletions }) {
  const done = isDoneThisCycle(chore);
  const strip = buildDayStrip(
    chore.completions.map((completion) => completion.date),
    DAY_STRIP_LENGTH,
  );

  return (
    <li className="rounded bg-zinc-50 px-3 py-2">
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
              className={`rounded px-2 py-1 text-xs ${
                done ? "bg-green-100 text-green-700" : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            >
              {done ? "완료 ✓" : "완료"}
            </button>
          </form>
          <form action={deleteChore.bind(null, chore.id)}>
            <button
              type="submit"
              aria-label={`${chore.name} 삭제`}
              className="text-xs text-zinc-400 hover:text-red-500"
            >
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
}
