import SelectedItem from "../../../../model/styling/SelectedItem";
import SelectionProgressCallback from "../../callback/SelectionProgressCallback";

export default interface KarteContainerCallback {
  selectionProgressCallback: SelectionProgressCallback;
  onKarteFetched: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[]
  ) => void;
}
