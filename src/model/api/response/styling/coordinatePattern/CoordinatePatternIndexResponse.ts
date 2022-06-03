import { Coordinate } from "./Coordinate";
import { CoordinateAdviceCategoryResponse } from "./CoordinateAdviceCategoryResponse";

export interface CoordinatePatternIndexResponse {
  readonly adviceCategories: CoordinateAdviceCategoryResponse[];
  readonly selectedCoordinatePatterns: Coordinate[];
}
