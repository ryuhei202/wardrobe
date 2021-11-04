export interface SelectionProgressCallback {
  onSelect: (index: number) => void;
  onClickCompleteButton: () => void;
  onAddItemNum: () => void;
}
