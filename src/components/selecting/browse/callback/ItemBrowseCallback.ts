import { TItem } from "./../../../../model/selecting/TItem";

export interface ItemBrowseCallback {
  onSelectItem: (item: TItem) => void;
}
