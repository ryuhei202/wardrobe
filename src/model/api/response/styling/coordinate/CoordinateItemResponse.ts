import { ImagePathResponse } from "../ImagePathResponse";
import { PartSizeResponse } from "../karte/KartePartSizeResponse";

export interface CoordinateItemResponse {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly mainColorName: string;
  readonly subColorName: string;
  readonly size: string;
  readonly partSizes: PartSizeResponse[];
  readonly dropSize: string;
}
