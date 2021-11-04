import { Refinement } from "../../../../styling/browse/Refinement";
import { FilterChoiceResponse } from "./FilterChoiceResponse";
import { FilterResponse } from "./FilterResponse";

export interface RefinementChoiceResponse {
  readonly filter: FilterChoiceResponse;
  readonly sort: FilterResponse[];
  readonly defaultRefinement: Refinement;
}
