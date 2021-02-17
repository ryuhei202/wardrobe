export default interface AddedOutfitListData {
  readonly outfitList: {
    readonly items: {
      readonly id: number;
      readonly categoryName: string;
    }[];
    readonly advices: string[];
  }[];
  readonly editingOutfit: number;
}
