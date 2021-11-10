import { SelectedItem } from "../../../../model/styling/SelectedItem";

export interface ItemBrowseCallback {
  onSelectItem: (item: SelectedItem) => void;
}
