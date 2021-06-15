import ImagePathResponse from "../ImagePathResponse";
import DetailColorResponse from "./DetailColorResponse";
import DetailSizeResponse from "./DetailSizeResponse";

export default interface DetailResponse {
  readonly itemImagePath: ImagePathResponse;
  readonly seriesName: string | null;
  readonly categoryName: string;
  readonly brandName: string;
  readonly color: DetailColorResponse;
  readonly sizes: DetailSizeResponse[];
  readonly outfitImagePaths: ImagePathResponse[];
}
