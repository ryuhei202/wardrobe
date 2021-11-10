import { ValidationErrorType } from "./ValidationErrorType";

export interface ValidationError {
  readonly errorType: ValidationErrorType;
  readonly message: string;
}
