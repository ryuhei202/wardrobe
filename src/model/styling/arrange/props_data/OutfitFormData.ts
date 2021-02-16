export default interface OutfitFormData {
  readonly items: {
    readonly itemId: number;
    readonly itemImagePath: string;
    readonly categoryName: string;
    readonly isSelected: boolean;
  }[];
  readonly advices: {
    readonly categoryChoice: string[];
    readonly selectedCategory: number | null;
    readonly adviceChoice: {
      readonly title: string;
      readonly description: string;
    }[];
    readonly selectedAdvice: number | null;
  }[];
}
