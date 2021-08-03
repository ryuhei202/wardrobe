import { InfoMemberImageResponse } from "./InfoMemberImageResponse";
import { InfoNgCategoryResponse } from "./InfoNgCategoryResponse";
import { InfoPastOutfitResponse } from "./InfoPastOutfitResponse";
import { InfoPurchasedItemResponse } from "./InfoPurchasedItemRespons";

export interface InfoResponse {
  readonly memberName: string;
  readonly tMemberId: number;
  readonly tChartId: number;
  readonly memberImages: InfoMemberImageResponse[];
  readonly pastOutfits: InfoPastOutfitResponse[];
  readonly ngCategories: InfoNgCategoryResponse[];
  readonly purchasedItems: InfoPurchasedItemResponse[];
}
