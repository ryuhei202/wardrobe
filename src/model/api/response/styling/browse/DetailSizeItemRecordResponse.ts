import { ValidationError } from "../../../../selecting/browse/ValidationError";

export interface DetailSizeItemRecordResponse {
  readonly itemId: number;
  readonly values: number[];
  readonly locationName: string;
  readonly locationId: number;
  readonly rank: string;
  readonly validationErrors: ValidationError[];
}
