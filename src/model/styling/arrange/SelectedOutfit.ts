import SelectedAdvice from "./SelectedAdvice";

export default interface SelectedOutfit {
  readonly itemIds: number[];
  readonly advices: SelectedAdvice[];
}
