export default interface OutfitFormCallback {
  onSelectItem: (index: number) => void;
  onSelectCategory: (selectIndex: number, categoryIndex: number) => void;
  onSelectAdvice: (selectIndex: number, adviceIndex: number) => void;
  onClickAddOutfit: () => void;
}
