import { FilterSliderArrayCallback } from "./FilterSliderArrayCallback";

export interface FilterPartSizeCallback {
  onPresetChanged: (index: number) => void;
  filterSliderArrayCallback: FilterSliderArrayCallback;
}
