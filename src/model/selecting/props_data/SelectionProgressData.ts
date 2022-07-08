import { TFootwear } from "./../footwear/TFootwear";
import { TItem } from "./../TItem";

export interface SelectionProgressData {
  readonly rentableItemNum: number;
  readonly selectedIndex: number;
  readonly items: TItem[];
  readonly selecterFootwear: TFootwear | null;
}
