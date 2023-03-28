import { FilterFormalRankCallback } from "./FilterFormalRankCallback";

export interface FilterSliderCallback {
  onChange: (value: number[]) => FilterFormalRankCallback;
}
