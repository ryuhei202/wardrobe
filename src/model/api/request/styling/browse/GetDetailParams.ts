import { GetDetailFilterParams } from "./GetDetailFilterParams";

export interface GetDetailParams {
  chartId: number;
  preregisteredItemId: number;
  filter: GetDetailFilterParams;
}
