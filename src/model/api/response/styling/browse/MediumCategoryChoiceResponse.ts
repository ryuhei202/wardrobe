import FilterResponse from "./FilterResponse";

export default interface MediumCategoryChoiceResponse {
  readonly id: number;
  readonly name: string;
  readonly smallCategory: FilterResponse[];
}
