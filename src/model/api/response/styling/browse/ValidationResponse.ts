import { ValidationErrorType } from "./ValidationErrorType";

export default interface ValidationResponse {
  readonly errorType: ValidationErrorType;
  readonly message: string;
}
