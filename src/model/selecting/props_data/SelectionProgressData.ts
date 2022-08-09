import { TFootwear } from "./../footwear/TFootwear";
import { TCoordinateItem } from "../../coordinateItem/TCoordinateItem";

export interface SelectionProgressData {
  readonly rentableItemNum: number;
  readonly selectedIndex: number;
  readonly items: TCoordinateItem[];
  readonly selectedFootwear: TFootwear | null;
}
