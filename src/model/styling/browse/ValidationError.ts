import { ValidationErrorType } from "./ValidationErrorType";

export default interface Validation {
  readonly errorType: ValidationErrorType;
  readonly message: string;
}
