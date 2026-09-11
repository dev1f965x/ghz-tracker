import type { HoyoGame } from "@/generated/prisma/client";

export const GAMES: readonly HoyoGame[] = ["GENSHIN", "HONKAI_STAR_RAIL", "ZENLESS_ZONE_ZERO"];

export const GAME_LABELS: Record<HoyoGame, string> = {
  GENSHIN: "원신",
  HONKAI_STAR_RAIL: "붕괴: 스타레일",
  ZENLESS_ZONE_ZERO: "젠레스 존 제로",
};

export function isHoyoGame(value: unknown): value is HoyoGame {
  return typeof value === "string" && (GAMES as readonly string[]).includes(value);
}
