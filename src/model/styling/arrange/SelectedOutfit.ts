import SelectedAdvice from "./SelectedAdvice";

export default interface SelectedOutfit {
  readonly areItemsSelected: boolean[];
  readonly advices: SelectedAdvice[];
}
