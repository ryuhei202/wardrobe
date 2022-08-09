import { TCoordinateItem } from "../../coordinateItem/TCoordinateItem";

export interface SelectionProgressData {
  readonly rentableItemNum: number;
  readonly selectedIndex: number;
  readonly items: TCoordinateItem[];
}
