export const RANK = {
  S: "S",
  A: "A",
  B: "B",
} as const;

export type TRank = (typeof RANK)[keyof typeof RANK];

export const ranks: TRank[] = [RANK.S, RANK.A, RANK.B];
