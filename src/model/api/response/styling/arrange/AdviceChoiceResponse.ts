import { AdviceResponse } from "./AdviceResponse";

export interface AdviceChoiceResponse {
  readonly name: string;
  readonly advice: AdviceResponse[];
}
