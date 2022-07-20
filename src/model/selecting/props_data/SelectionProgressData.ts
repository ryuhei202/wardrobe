import { SelectedItem } from "../SelectedItem";

export interface SelectionProgressData {
  readonly rentableItemNum: number;
  readonly selectedIndex: number;
  readonly items: SelectedItem[];
}
