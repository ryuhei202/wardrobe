import { GetIndexFilterParams } from "./GetIndexFilterParams";

export interface GetIndexParams {
  chartId?: number;
  sort: number;
  page_no: number;
  filter: GetIndexFilterParams;
}
