import FilterChoiceResponse from "./FilterChoiceResponse";
import FilterResponse from "./FilterResponse";

export default interface RefinementChoiceResponse {
  filter: FilterChoiceResponse;
  sort: FilterResponse[];
}
