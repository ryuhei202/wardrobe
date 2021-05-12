import { ValidationErrorType } from "./ValidationErrorType";

export default interface ValidationError {
  readonly errorType: ValidationErrorType;
  readonly message: string;
}
