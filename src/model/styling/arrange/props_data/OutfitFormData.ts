export interface OutfitFormData {
  readonly items: {
    readonly itemId: number;
    readonly itemImagePath: string;
    readonly categoryName: string;
    readonly isSelected: boolean;
  }[];
  readonly selectedAdviceIds: (number | null)[];
}
