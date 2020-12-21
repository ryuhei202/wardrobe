import FilterMediaResponse from "./FilterMediaResponse";
import FilterResponse from "./FilterResponse";
import LargeCategoryChoiceResponse from "./LargeCategoryChoiceResponse";

export default interface FilterChoiceResponse {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly option: FilterResponse[];
}
