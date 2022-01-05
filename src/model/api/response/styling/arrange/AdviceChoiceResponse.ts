import { AdviceCategoryResponse } from "./AdviceCategoryResponse";
import { Outfit } from "../../../../selecting/arrange/Outfit";

export interface AdviceChoiceResponse {
  readonly adviceCategories: AdviceCategoryResponse[];
  readonly selectedOutfits: Outfit[];
}
