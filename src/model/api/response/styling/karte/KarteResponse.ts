import { SelectedItem } from "../../../../selecting/SelectedItem";
import { InfoResponse } from "./InfoResponse";

export interface KarteResponse {
  readonly info: InfoResponse;
  readonly defaultItemNum: number;
  readonly registeredItems: SelectedItem[];
}
