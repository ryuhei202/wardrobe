import { ImagePathResponse } from "../ImagePathResponse";
import { PartSizeResponse } from "./PartSizeResponse";

export interface KartesItemResponse {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly mainColorName: string;
  readonly subColorName: string;
  readonly size: string;
  readonly partSizes: PartSizeResponse[];
  readonly dropSize: string;
  readonly rating: number | null;
  readonly reviewText: string;
}
