import { CoordinateAdviceResponse } from "./CoordinateAdviceResponse";

export interface CoordinateAdviceCategoryResponse {
  readonly name: string;
  readonly advice: CoordinateAdviceResponse[];
}
