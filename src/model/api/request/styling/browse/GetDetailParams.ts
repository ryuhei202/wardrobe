import GetDetailFilterParams from "./GetDetailFilterParams";

export default interface GetDetailParams {
  chartId: number;
  preregisteredItemId: number;
  filter: GetDetailFilterParams;
}
