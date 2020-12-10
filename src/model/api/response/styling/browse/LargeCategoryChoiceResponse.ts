import MediumCategoryChoiceResponse from "./MediumCategoryChoiceResponse";

export default interface LargeCategoryChoiceResponse {
  readonly id: number;
  readonly name: string;
  readonly mediumCategory: MediumCategoryChoiceResponse[];
}
