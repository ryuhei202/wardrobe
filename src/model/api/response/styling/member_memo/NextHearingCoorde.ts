export const NEXT_HEARING_COORDE = {
  HEARING: 0,
  HEARING_END: 1,
} as const;

export type TNextHearingCoorde =
  typeof NEXT_HEARING_COORDE[keyof typeof NEXT_HEARING_COORDE];
