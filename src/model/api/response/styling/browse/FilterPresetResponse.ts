import { FilterPresetValueResponse } from "./FilterPresetValueResponse";

export interface FilterPresetResponse {
  readonly name: string;
  readonly values: FilterPresetValueResponse[];
}
