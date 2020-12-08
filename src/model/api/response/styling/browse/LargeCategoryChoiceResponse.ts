import MediumCategoryChoiceResponse from "./MediumCategoryChoiceResponse";

export default interface LargeCategoryChoiceResponse {
  id: number;
  name: string;
  mediumCategory: MediumCategoryChoiceResponse[];
}
