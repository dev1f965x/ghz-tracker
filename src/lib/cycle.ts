import { dateKey, daysBetween, startOfDay } from "./date";

/** Repeat intervals offered when adding a chore. */
export const INTERVALS = [
  { days: 1, label: "매일" },
  { days: 3, label: "3일마다" },
  { days: 7, label: "매주" },
  { days: 14, label: "2주마다" },
  { days: 30, label: "매월" },
] as const;

export function isInterval(days: number): boolean {
  return INTERVALS.some((interval) => interval.days === days);
}

export function intervalLabel(days: number): string {
  return INTERVALS.find((interval) => interval.days === days)?.label ?? `${days}일마다`;
}

type ChoreState = { lastDoneAt: Date | null; intervalDays: number; streak: number };

/** Whether the chore has already been done within its current interval. */
export function isDoneThisCycle({ lastDoneAt, intervalDays }: ChoreState, now = new Date()): boolean {
  return lastDoneAt !== null && daysBetween(lastDoneAt, now) < intervalDays;
}

/** Streak after completing now. Skipping a whole interval starts the streak over. */
export function nextStreak({ lastDoneAt, intervalDays, streak }: ChoreState, now = new Date()): number {
  if (lastDoneAt === null) return 1;
  return daysBetween(lastDoneAt, now) >= intervalDays * 2 ? 1 : streak + 1;
}

/** The last `days` days ending today, oldest first, marking which had a completion. */
export function buildDayStrip(completionDates: Date[], days: number): { date: string; done: boolean }[] {
  const completed = new Set(completionDates.map(dateKey));
  const today = startOfDay(new Date());

  return Array.from({ length: days }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (days - 1 - i));
    const key = dateKey(day);
    return { date: key, done: completed.has(key) };
  });
}
