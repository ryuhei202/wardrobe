import FilterResponse from "./FilterResponse";

export default interface MediumCategoryChoiceResponse {
  id: number;
  name: string;
  smallCategory: FilterResponse[];
}
