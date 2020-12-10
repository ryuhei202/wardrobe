import FilterChoiceResponse from "./FilterChoiceResponse";
import FilterResponse from "./FilterResponse";

export default interface RefinementChoiceResponse {
  readonly filter: FilterChoiceResponse;
  readonly sort: FilterResponse[];
}
