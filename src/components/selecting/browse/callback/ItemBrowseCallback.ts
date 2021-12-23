import { SelectedItem } from "../../../../model/selecting/SelectedItem";

export interface ItemBrowseCallback {
  onSelectItem: (item: SelectedItem) => void;
}
