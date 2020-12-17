import SelectedItem from "../../../../model/styling/SelectedItem";

export default interface BrowseDetailCallback {
  onSelectItem: (item: SelectedItem) => void;
  onClickBackButton: () => void;
}
