import FilterMediaResponse from "./FilterMediaResponse";
import FilterRangeResponse from "./FilterRangeResponse";
import FilterResponse from "./FilterResponse";
import LargeCategoryChoiceResponse from "./LargeCategoryChoiceResponse";

export default interface FilterChoiceResponse {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly partSize: FilterRangeResponse[];
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly dropSize: FilterResponse[];
  readonly option: FilterResponse[];
}
