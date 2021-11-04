import { ImagePathResponse } from "../ImagePathResponse";

export interface InfoPurchasedItemResponse {
  readonly id: number;
  readonly imagePath: ImagePathResponse;
  readonly brandName: string;
  readonly size: string;
  readonly categoryName: string;
  readonly colorName: string;
  readonly patternName: string;
  readonly purchasedDate: string;
}
