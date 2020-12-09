import ItemCardResponse from "./ItemCardResponse";

export default interface BrowseIndexResponse {
  totalCount: number;
  totalPageNum: number;
  itemCard: ItemCardResponse[];
}
