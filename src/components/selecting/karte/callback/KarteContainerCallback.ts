import { SelectedItem } from "../../../../model/selecting/SelectedItem";

export interface KarteContainerCallback {
  onKarteFetched: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[],
    rentableItemNum: number
  ) => void;
}
