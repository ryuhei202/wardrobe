import { SelectedItem } from "../../../../model/styling/SelectedItem";

export interface BrowseDetailCallback {
  onSelectItem: (item: SelectedItem) => void;
  onClickBackButton: () => void;
}
