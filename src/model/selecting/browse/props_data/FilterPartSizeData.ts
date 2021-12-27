import { FilterSliderData } from "./FilterSliderData";

export interface FilterPartSizeData {
  readonly selectedPresetIndex: number | null;
  readonly presets: string[];
  readonly sliders: FilterSliderData[];
}
