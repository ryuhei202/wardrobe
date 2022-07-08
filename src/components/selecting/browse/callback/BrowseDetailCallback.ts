import { TItem } from "../../../../model/selecting/TItem";

export interface BrowseDetailCallback {
  onSelectItem: (item: TItem) => void;
  onClickBackButton: () => void;
}
