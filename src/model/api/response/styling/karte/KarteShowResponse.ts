import { TItem } from "../../../../selecting/TItem";

export interface KarteShowResponse {
  readonly id: number;
  readonly hearingCompleted: boolean;
  readonly rentalStartedAt: string | null;
  readonly defaultItemNum: number;
  readonly registeredItems: TItem[];
}
