import SelectedItem from "../SelectedItem";

export default interface SelectionProgressData {
  readonly selectedIndex: number;
  readonly items: SelectedItem[];
}
