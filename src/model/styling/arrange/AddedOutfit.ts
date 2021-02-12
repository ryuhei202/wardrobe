import AddedOutfitItem from "./AddedOutfitItem";

export default interface AddedOutfit {
  readonly items: AddedOutfitItem[];
  readonly advices: string[];
}
