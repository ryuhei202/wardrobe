export interface OutfitFormCallback {
  onSelectItem: (id: number) => void;
  onSelectAdvice: (adviceId: number, index: number) => void;
  onClickAddOutfit: () => void;
}
