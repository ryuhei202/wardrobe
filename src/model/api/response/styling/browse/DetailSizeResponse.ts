import DetailSizeItemRecordResponse from "./DetailSizeItemRecordResponse";

export default interface DetailSizeResponse {
  readonly name: string;
  readonly columns: string[];
  readonly itemRecords: DetailSizeItemRecordResponse[];
}
