import AdviceChoice from "./AdviceChoice";

export default interface OutfitAdvice {
  readonly categoryChoice: string[];
  readonly selectedCategory: number | null;
  readonly adviceChoice: AdviceChoice[];
  readonly selectedAdvice: number | null;
}
