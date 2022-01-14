import { PartSize } from "./PartSize";

export interface SelectedItem {
  readonly itemId: number;
  readonly itemImagePath: string;
  readonly partSizes: PartSize[];
  readonly locationName: string;
  readonly categoryName: string;
  readonly mainColorName: string;
  readonly subColorName: string;
}
