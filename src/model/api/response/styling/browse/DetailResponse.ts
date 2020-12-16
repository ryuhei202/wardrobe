import DetailColorResponse from "./DetailColorResponse";
import DetailSizeResponse from "./DetailSizeResponse";

export default interface DetailResponse {
  readonly itemImagePath: string;
  readonly seriesName: string;
  readonly brandName: string;
  readonly color: DetailColorResponse;
  readonly sizes: DetailSizeResponse[];
}
