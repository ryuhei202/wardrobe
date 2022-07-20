import { ImagePathResponse } from "../ImagePathResponse";
import { DetailColorResponse } from "./DetailColorResponse";
import { DetailSizeResponse } from "./DetailSizeResponse";
import { DetailSizeItemRecordResponse } from "./DetailSizeItemRecordResponse";
import { WearingImage } from "./DetailWearingImageResponse";

export interface DetailResponse {
  readonly itemImagePath: ImagePathResponse;
  readonly seriesName: string | null;
  readonly seriesFeature: string | null;
  readonly categoryName: string;
  readonly brandName: string;
  readonly mainColor: DetailColorResponse;
  readonly subColor: DetailColorResponse;
  readonly sizes: DetailSizeResponse[];
  readonly wearingImages: WearingImage[];
  readonly unsizedItemRecords: DetailSizeItemRecordResponse[];
}
