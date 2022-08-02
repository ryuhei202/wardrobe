import { TFootwear } from "./../footwear/TFootwear";
import { TItem } from "./../TItem";

export interface SelectionConfirmData {
  readonly items: TItem[];
  readonly selectedFootwear: TFootwear | null;
}
