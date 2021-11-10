import { DetailSizeItemRecordResponse } from "./DetailSizeItemRecordResponse";

export interface DetailSizeResponse {
  readonly name: string;
  readonly columns: string[];
  readonly itemRecords: DetailSizeItemRecordResponse[];
}
