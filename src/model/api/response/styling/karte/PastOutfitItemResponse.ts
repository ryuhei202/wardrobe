import ImagePathResponse from "../ImagePathResponse";
import PartSizeResponse from "./PartSizeResponse";

export default interface PastOutfitItemResponse {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly colorName: string;
  readonly size: string;
  readonly partSizes: PartSizeResponse[];
  readonly dropSize: string;
}
