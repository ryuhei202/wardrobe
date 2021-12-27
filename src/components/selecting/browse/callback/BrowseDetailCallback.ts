import { SelectedItem } from "../../../../model/selecting/SelectedItem";

export interface BrowseDetailCallback {
  onSelectItem: (item: SelectedItem) => void;
  onClickBackButton: () => void;
}
