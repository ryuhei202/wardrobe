import { SelectedItem } from "../../../../model/styling/SelectedItem";

export interface KarteContainerCallback {
  onKarteFetched: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[],
    rentableItemNum: number
  ) => void;
}
