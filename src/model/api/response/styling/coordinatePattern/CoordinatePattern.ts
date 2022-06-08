import { CoordinateAdviceResponse } from "./CoordinateAdviceResponse";
import { CoordinateItemResponse } from "./CoordinateItemResponse";

export interface CoordinatePattern {
  readonly id: number;
  readonly items: CoordinateItemResponse[];
  readonly advices: CoordinateAdviceResponse[];
  readonly formalLevel: number;
}
