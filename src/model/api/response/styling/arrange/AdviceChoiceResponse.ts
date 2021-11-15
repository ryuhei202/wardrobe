import { AdviceCategoryResponse } from "./AdviceCategoryResponse";
import { Outfit } from "../../../../styling/arrange/Outfit";

export interface AdviceChoiceResponse {
  readonly adviceCategories: AdviceCategoryResponse[];
  readonly selectedOutfits: Outfit[];
}
