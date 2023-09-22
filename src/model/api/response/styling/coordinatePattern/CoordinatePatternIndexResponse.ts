import { CoordinateAdviceCategoryResponse } from "./CoordinateAdviceCategoryResponse";
import { CoordinatePattern } from "./CoordinatePattern";

export interface CoordinatePatternIndexResponse {
  readonly adviceCategories: CoordinateAdviceCategoryResponse[];
  readonly selectedCoordinatePatterns: CoordinatePattern[];
}
