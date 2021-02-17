import GetIndexFilterPartSizeParams from "./GetIndexFilterPartSizeParams";

export default interface GetIndexFilterParams {
  itemId?: number;
  largeCategory?: number;
  mediumCategory?: number;
  smallCategory: number[];
  size: number[];
  partSize: GetIndexFilterPartSizeParams[];
  color: number[];
  pattern: number[];
  logo: number[];
  dropSize: number[];
  option: number[];
}
