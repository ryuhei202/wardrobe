import ValidationError from "../../../../styling/browse/ValidationError";

export default interface DetailSizeItemRecordResponse {
  readonly itemId: number;
  readonly values: number[];
  readonly locationName: string;
  readonly validationErrors: ValidationError[];
}
