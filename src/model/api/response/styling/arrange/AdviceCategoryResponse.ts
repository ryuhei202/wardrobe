import { AdviceResponse } from "./AdviceResponse";

export interface AdviceCategoryResponse {
  readonly name: string;
  readonly advice: AdviceResponse[];
}
