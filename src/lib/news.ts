import type { NewsType } from "@/generated/prisma/client";

export const NEWS_TYPES: readonly NewsType[] = ["BROADCAST", "PV", "UPDATE", "EVENT"];

export const NEWS_TYPE_LABELS: Record<NewsType, string> = {
  BROADCAST: "방송",
  PV: "PV",
  UPDATE: "업데이트",
  EVENT: "이벤트",
};

export const NEWS_TYPE_STYLES: Record<NewsType, string> = {
  BROADCAST: "bg-purple-100 text-purple-700",
  PV: "bg-blue-100 text-blue-700",
  UPDATE: "bg-green-100 text-green-700",
  EVENT: "bg-amber-100 text-amber-700",
};

export function isNewsType(value: unknown): value is NewsType {
  return typeof value === "string" && (NEWS_TYPES as readonly string[]).includes(value);
}
