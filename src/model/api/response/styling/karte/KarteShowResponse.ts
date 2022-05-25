import { SelectedItem } from "../../../../selecting/SelectedItem";

export interface KarteShowResponse {
  readonly id: number;
  readonly memoNext: string | null;
  readonly rentalStartedAt: string | null;
  readonly defaultItemNum: number;
  readonly registeredItems: SelectedItem[];
}
