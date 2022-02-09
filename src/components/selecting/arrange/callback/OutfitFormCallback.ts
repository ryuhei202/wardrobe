export interface OutfitFormCallback {
  onSelectItem: (id: number) => void;
  onSelectAdvice: (adviceId: number, index: number) => void;
  onSelectFormalLevel: (value: number) => void;
  onClickAddOutfit: () => void;
}
