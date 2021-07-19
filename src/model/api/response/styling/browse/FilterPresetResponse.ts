import FilterPresetValueResponse from "./FilterPresetValueResponse";

export default interface FilterPresetResponse {
  readonly name: string;
  readonly values: FilterPresetValueResponse[];
}
