import { CoordinatePattern } from "./CoordinatePattern";
import { CoordinateAdviceCategoryResponse } from "./CoordinateAdviceCategoryResponse";

export interface CoordinatePatternIndexResponse {
  readonly adviceCategories: CoordinateAdviceCategoryResponse[];
  readonly selectedCoordinatePatterns: CoordinatePattern[];
}
