import GetIndexFilterValueParams from "./GetIndexFilterValueParams";

export default interface GetIndexFilterParams {
  size: number[];
  partSize: GetIndexFilterValueParams[];
  option: number[];
}
