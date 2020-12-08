import FilterChoiceResponse from "./FilterChoiceResponse";

import ItemCardResponse from "./ItemCardResponse";

export default interface BrowseIndexContentResponse {
  totalPageNum: number;
  itemCard: ItemCardResponse;
}
