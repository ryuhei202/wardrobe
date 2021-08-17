import FilterMediaResponse from "./FilterMediaResponse";
import FilterResponse from "./FilterResponse";
import LargeCategoryChoiceResponse from "./LargeCategoryChoiceResponse";
import { FilterPartSizeResponse } from "./FilterPartSizeResponse";

export interface FilterChoiceResponse {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly partSize: FilterPartSizeResponse;
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly dropSize: FilterResponse[];
  readonly ng: FilterResponse[];
  readonly option: FilterResponse[];
}
