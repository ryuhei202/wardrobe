import { ValidationErrorType } from "./ValidationErrorType";

export default interface RefinementChoiceResponse {
  readonly errorType: ValidationErrorType;
  readonly message: string;
}
