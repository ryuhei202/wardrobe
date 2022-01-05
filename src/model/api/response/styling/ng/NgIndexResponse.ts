import { NgResponse } from "./NgResponse";

export interface NgIndexResponse {
  readonly categoryName: string;
  readonly ngs: NgResponse[];
}
