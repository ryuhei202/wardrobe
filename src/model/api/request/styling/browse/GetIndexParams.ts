import GetIndexFilterParams from "./GetIndexFilterParams";

export default interface GetIndexParams {
  chartId: number;
  sort: number;
  page_no: number;
  filter: GetIndexFilterParams;
}
