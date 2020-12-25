import ImagePathResponse from "./ImagePathResponse";
import PartSizeResponse from "./PartSizeResponse";

export default interface PastOutfitItemResponse {
  readonly imagePath: ImagePathResponse;
  readonly categoryName: string;
  readonly size: string;
  readonly partSizes: PartSizeResponse[];
}
