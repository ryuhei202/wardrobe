import { MediumCategoryChoiceResponse } from "./MediumCategoryChoiceResponse";

export interface LargeCategoryChoiceResponse {
  readonly id: number;
  readonly name: string;
  readonly mediumCategory: MediumCategoryChoiceResponse[];
}
