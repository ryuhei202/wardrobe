import SelectedItem from "../SelectedItem";

export default interface SelectionProgressData {
  readonly rentableItemNum: number;
  readonly selectedIndex: number;
  readonly items: SelectedItem[];
}
