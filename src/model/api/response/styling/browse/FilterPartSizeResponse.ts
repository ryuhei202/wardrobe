import { FilterPresetResponse } from "./FilterPresetResponse";
import { FilterRangeResponse } from "./FilterRangeResponse";

export interface FilterPartSizeResponse {
  readonly presets: FilterPresetResponse[];
  readonly ranges: FilterRangeResponse[];
}
