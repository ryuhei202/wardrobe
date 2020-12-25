import GetIndexFilterValueParams from "./GetIndexFilterValueParams";

export default interface GetIndexFilterParams {
  largeCategory?: number;
  mediumCategory?: number;
  smallCategory: number[];
  size: number[];
  partSize: GetIndexFilterValueParams[];
  color: number[];
  pattern: number[];
  logo: number[];
  option: number[];
}
