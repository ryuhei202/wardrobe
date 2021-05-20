export default interface AppliedFiltersCallback {
  onClear: () => void;
  onDelete: (index: number) => void;
}
