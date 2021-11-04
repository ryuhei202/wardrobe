import { ItemCardResponse } from "./ItemCardResponse";

export interface BrowseIndexResponse {
  readonly totalCount: number;
  readonly totalPageNum: number;
  readonly pageNo: number;
  readonly itemCard: ItemCardResponse[];
}
