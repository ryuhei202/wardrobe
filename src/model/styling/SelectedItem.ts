import PartSize from "./PartSize";

export default interface SelectedItem {
  readonly itemId: number;
  readonly itemImagePath: string;
  readonly partSizes: PartSize[];
  readonly locationName: string;
  readonly categoryName: string;
}
