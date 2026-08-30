function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysSince(date: Date | null): number {
  if (!date) return Infinity;
  const diffMs = startOfDay(new Date()).getTime() - startOfDay(date).getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function isDoneThisCycle(lastDoneAt: Date | null, intervalDays: number): boolean {
  return daysSince(lastDoneAt) < intervalDays;
}

export function todayDateOnly(): Date {
  return startOfDay(new Date());
}

export function buildDayStrip(
  completionDates: Date[],
  days: number,
): { date: string; done: boolean }[] {
  const completedSet = new Set(completionDates.map((d) => startOfDay(d).toISOString().slice(0, 10)));
  const today = startOfDay(new Date());
  const result: { date: string; done: boolean }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, done: completedSet.has(key) });
  }

  return result;
}

export function intervalLabel(days: number): string {
  if (days === 1) return "매일";
  if (days === 7) return "매주";
  if (days === 14) return "2주마다";
  if (days === 30) return "매월";
  return `${days}일마다`;
}
