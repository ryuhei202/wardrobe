import ItemCardResponse from "./ItemCardResponse";

export default interface BrowseIndexResponse {
  readonly totalCount: number;
  readonly totalPageNum: number;
  readonly itemCard: ItemCardResponse[];
}
