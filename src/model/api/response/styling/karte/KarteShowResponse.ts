import { SelectedItem } from "../../../../selecting/SelectedItem";

export interface KarteShowResponse {
  readonly defaultItemNum: number;
  readonly registeredItems: SelectedItem[];
}
