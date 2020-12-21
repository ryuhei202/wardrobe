import SelectedItem from "../../../../model/styling/SelectedItem";

export default interface ItemBrowseCallback {
  onSelectItem: (item: SelectedItem) => void;
}
