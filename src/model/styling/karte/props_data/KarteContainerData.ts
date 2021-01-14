import SelectedItem from "../../SelectedItem";

export default interface KarteContainerData {
  readonly selectedIndex: number;
  readonly items: SelectedItem[];
}
