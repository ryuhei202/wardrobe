import SelectedItem from "../../../../model/styling/browse/SelectedItem";

export default interface BrowseDetailCallback {
  onSelectItem: (item: SelectedItem) => void;
  onClickBackButton: () => void;
}
