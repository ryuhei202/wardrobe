import { NgResponse } from "./NgResponse";

export interface InfoNgCategoryResponse {
  readonly categoryName: string;
  readonly ngs: NgResponse[];
}
