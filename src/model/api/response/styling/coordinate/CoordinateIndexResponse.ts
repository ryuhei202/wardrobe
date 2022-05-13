import { Coordinate } from "./Coordinate";
import { CoordinateAdviceCategoryResponse } from "./CoordinateAdviceCategoryResponse";

export interface CoordinateIndexResponse {
  readonly adviceCategories: CoordinateAdviceCategoryResponse[];
  readonly selectedCoordinates: Coordinate[];
}
