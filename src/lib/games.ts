export const GAMES = ["GENSHIN", "HONKAI_STAR_RAIL", "ZENLESS_ZONE_ZERO"] as const;

export type HoyoGame = (typeof GAMES)[number];

export const GAME_LABELS: Record<HoyoGame, string> = {
  GENSHIN: "원신",
  HONKAI_STAR_RAIL: "붕괴: 스타레일",
  ZENLESS_ZONE_ZERO: "젠레스 존 제로",
};

export function isHoyoGame(value: string): value is HoyoGame {
  return (GAMES as readonly string[]).includes(value);
}
