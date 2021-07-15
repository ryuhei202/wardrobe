import { InfoMemberImageResponse } from "./InfoMemberImageResponse";
import { InfoNgResponse } from "./InfoNgResponse";
import { InfoPastOutfitResponse } from "./InfoPastOutfitResponse";
import { InfoPurchasedItemResponse } from "./InfoPurchasedItemRespons";

export interface InfoResponse {
  readonly memberName: string;
  readonly tMemberId: number;
  readonly tChartId: number;
  readonly memberImages: InfoMemberImageResponse[];
  readonly pastOutfits: InfoPastOutfitResponse[];
  readonly ngs: InfoNgResponse[];
  readonly purchasedItems: InfoPurchasedItemResponse[];
}
