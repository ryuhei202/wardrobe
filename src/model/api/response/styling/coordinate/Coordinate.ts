import { CoordinateAdviceResponse } from "./CoordinateAdviceResponse";
import { CoordinateItemResponse } from "./CoordinateItemResponse";

export interface Coordinate {
  readonly id: number | null;
  readonly items: CoordinateItemResponse[];
  readonly advices: CoordinateAdviceResponse[];
  readonly formalLevel: number;
}
