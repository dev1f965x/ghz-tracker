import { addNews, deleteNews } from "@/app/actions";
import type { News } from "@/generated/prisma/client";
import { formatDDay } from "@/lib/date";
import { GAME_LABELS, GAMES } from "@/lib/games";
import { NEWS_TYPE_LABELS, NEWS_TYPE_STYLES, NEWS_TYPES } from "@/lib/news";

export default function NewsList({ news }: { news: News[] }) {
  return (
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
          <select name="type" defaultValue="UPDATE" className="rounded border border-zinc-300 px-3 py-2">
            {NEWS_TYPES.map((type) => (
              <option key={type} value={type}>
                {NEWS_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            placeholder="제목"
            required
            className="rounded border border-zinc-300 px-3 py-2"
          />
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
        {news.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded border border-zinc-200 px-4 py-3"
          >
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${NEWS_TYPE_STYLES[item.type]}`}>
                  {NEWS_TYPE_LABELS[item.type]}
                </span>
                <p className="font-medium">
                  {GAME_LABELS[item.game]} —{" "}
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-600"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </p>
              </div>
              <p className="text-sm text-zinc-500">
                {item.date.toISOString().slice(0, 10)} · {formatDDay(item.date)}
              </p>
            </div>
            <form action={deleteNews.bind(null, item.id)}>
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
}
