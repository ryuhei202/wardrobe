import { TItem } from "../../../../selecting/TItem";
import { CoordinateAdviceResponse } from "./CoordinateAdviceResponse";
export interface CoordinatePattern {
  readonly id: number;
  readonly items: TItem[];
  readonly advices: CoordinateAdviceResponse[];
  readonly formalLevel: number;
}
