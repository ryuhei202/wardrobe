import { ImagePathResponse } from "../api/response/styling/ImagePathResponse";
import { PartSize } from "./PartSize";

export type TItem = {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly mainColorName: string;
  readonly subColorName: string;
  readonly brandName: string;
  readonly patternName: string;
  readonly size: string;
  readonly partSizes: PartSize[];
  readonly locationName: string;
  readonly dropSize: string;
  readonly rank: string;
};
