export default interface SelectionProgressCallback {
  onSelect: (index: number) => void;
  onClickCompleteButton: () => void;
}
