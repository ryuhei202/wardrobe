import FilterPresetResponse from "./FilterPresetResponse";
import FilterRangeResponse from "./FilterRangeResponse";

export default interface FilterPartSizeResponse {
  readonly presets: FilterPresetResponse[];
  readonly ranges: FilterRangeResponse[];
}
