import DetailColorResponse from "./DetailColorResponse";
import DetailSizeResponse from "./DetailSizeResponse";

export default interface DetailResponse {
  readonly itemImagePath: string;
  readonly seriesName: string | null;
  readonly brandName: string;
  readonly color: DetailColorResponse;
  readonly sizes: DetailSizeResponse[];
}
