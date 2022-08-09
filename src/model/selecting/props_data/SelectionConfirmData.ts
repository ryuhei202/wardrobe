import { TCoordinateItem } from "../../coordinateItem/TCoordinateItem";
import { TFootwear } from "./../footwear/TFootwear";

export interface SelectionConfirmData {
  readonly items: TCoordinateItem[];
  readonly selectedFootwear: TFootwear | null;
}
