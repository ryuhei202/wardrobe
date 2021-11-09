import { SelectedOutfitResponse } from "./SelectedOutfitResponse";
import { AdviceCategoryResponse } from "./AdviceCategoryResponse";

export interface AdviceChoiceResponse {
  readonly adviceCategories: AdviceCategoryResponse[];
  readonly selectedOutfits: SelectedOutfitResponse[];
}
