import { PartSizeResponse } from "./PartSizeResponse";
import ImagePathResponse from "../ImagePathResponse";

export interface InfoPastOutfitItemResponse {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly colorName: string;
  readonly size: string;
  readonly partSizes: PartSizeResponse[];
  readonly dropSize: string;
}
