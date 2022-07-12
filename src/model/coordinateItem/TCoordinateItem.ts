import { TItem } from "../selecting/TItem";

export type TCoordinateItem = {
  readonly id: number;
  readonly isChangeItem: boolean;
  readonly itemInfo: TItem;
};
