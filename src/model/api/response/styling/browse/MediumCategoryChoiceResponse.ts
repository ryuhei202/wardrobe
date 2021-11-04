import { FilterResponse } from "./FilterResponse";

export interface MediumCategoryChoiceResponse {
  readonly id: number;
  readonly name: string;
  readonly smallCategory: FilterResponse[];
}
