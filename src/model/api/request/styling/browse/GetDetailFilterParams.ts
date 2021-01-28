import GetIndexFilterPartSizeParams from "./GetIndexFilterPartSizeParams";

export default interface GetIndexFilterParams {
  size: number[];
  partSize: GetIndexFilterPartSizeParams[];
  option: number[];
}
