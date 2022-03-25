export interface AddedOutfitListData {
  readonly outfitList: {
    readonly items: {
      readonly id: number;
      readonly categoryName: string;
      readonly imagePath: string;
    }[];
    readonly advices: string[];
  }[];
  readonly editingOutfit: number;
}
