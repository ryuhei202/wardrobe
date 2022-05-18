export const NEXT_COORDE_HEARING = {
  HEARING: 0,
  HEARING_END: 1,
} as const;

export type TNextCoordeHearing =
  typeof NEXT_COORDE_HEARING[keyof typeof NEXT_COORDE_HEARING];
