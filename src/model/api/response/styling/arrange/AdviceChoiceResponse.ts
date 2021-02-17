import AdviceResponse from "./AdviceResponse";

export default interface AdviceChoiceResponse {
  readonly name: string;
  readonly advice: AdviceResponse[];
}
