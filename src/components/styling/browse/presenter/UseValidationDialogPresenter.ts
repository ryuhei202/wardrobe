import { ValidationErrorType } from "../../../../model/styling/browse/ValidationErrorType";
import { ValidationError } from "../../../../model/styling/browse/ValidationError";

export interface ValidationDialogPresenter {
  contentList: () => {
    isRejected: boolean;
    message: string;
  }[];
}

export const useValidationDialogPresenter = (
  error: ValidationError[]
): ValidationDialogPresenter => {
  const contentList = (): { isRejected: boolean; message: string }[] => {
    return error.map((row) => {
      return {
        isRejected: row.errorType === ValidationErrorType.Rejected,
        message: row.message,
      };
    });
  };

  return { contentList };
};
