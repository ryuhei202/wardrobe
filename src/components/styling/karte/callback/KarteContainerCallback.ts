import SelectedItem from "../../../../model/styling/SelectedItem";

export default interface KarteContainerCallback {
  onKarteFetched: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[],
    rentableItemNum: number
  ) => void;
}
