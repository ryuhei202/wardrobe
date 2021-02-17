import GetIndexFilterPartSizeParams from "./GetIndexFilterPartSizeParams";

export default interface GetDetailFilterParams {
  itemId?: number;
  size: number[];
  partSize: GetIndexFilterPartSizeParams[];
  option: number[];
}
