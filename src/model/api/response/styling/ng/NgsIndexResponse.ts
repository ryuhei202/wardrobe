import { NgResponse } from "./NgResponse";

export interface NgsIndexResponse {
  readonly categoryName: string;
  readonly ngs: NgResponse[];
}
