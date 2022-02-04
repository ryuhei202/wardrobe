import { Refinement } from "../../../../selecting/browse/Refinement";
import { FilterChoiceResponse } from "./FilterChoiceResponse";
import { FilterResponse } from "./FilterResponse";

export interface BrowseRefinementChoiceResponse {
  readonly filter: FilterChoiceResponse;
  readonly sort: FilterResponse[];
  readonly defaultRefinement: Refinement;
}
