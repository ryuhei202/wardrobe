import FilterMediaResponse from "./FilterMediaResponse";
import FilterResponse from "./FilterResponse";
import LargeCategoryChoiceResponse from "./LargeCategoryChoiceResponse";

export default interface FilterChoiceResponse {
  largeCategory: LargeCategoryChoiceResponse[];
  size: FilterResponse[];
  color: FilterMediaResponse[];
  pattern: FilterMediaResponse[];
  logo: FilterMediaResponse[];
  option: FilterResponse[];
}
