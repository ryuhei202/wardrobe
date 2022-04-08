import { Coordinate } from "../../../../selecting/arrange/Coordinate";
import { AdviceCategoryResponse } from "../arrange/AdviceCategoryResponse";

export interface CoordinateShowResponse {
  readonly adviceCategories: AdviceCategoryResponse[];
  readonly selectedCoordinates: Coordinate[];
}
