import { TFootwear } from "../../../model/selecting/footwear/TFootwear";

export interface SelectionProgressCallback {
  onSelect: (index: number) => void;
  onClickCompleteButton: () => void;
  onAddItemNum: () => void;
}
