import { TItem } from "../../../../selecting/TItem";

export interface KarteShowResponse {
  readonly id: number;
  readonly memoNext: string | null;
  readonly rentalStartedAt: string | null;
  readonly defaultItemNum: number;
  readonly registeredItems: TItem[];
}
