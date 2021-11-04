import { ValidationError } from "../../../../styling/browse/ValidationError";

export interface DetailSizeItemRecordResponse {
  readonly itemId: number;
  readonly values: number[];
  readonly locationName: string;
  readonly validationErrors: ValidationError[];
}
