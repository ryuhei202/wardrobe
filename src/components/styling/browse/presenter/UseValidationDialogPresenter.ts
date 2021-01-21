import { ValidationErrorType } from "../../../../model/api/response/styling/browse/ValidationErrorType";
import ValidationResponse from "../../../../model/api/response/styling/browse/ValidationResponse";

export interface ValidationDialogPresenter {
  contentList: () => {
    isRejected: boolean;
    message: string;
  }[];
}

export const useValidationDialogPresenter = (
  response: ValidationResponse[]
): ValidationDialogPresenter => {
  const contentList = (): { isRejected: boolean; message: string }[] => {
    return response.map((row) => {
      return {
        isRejected: row.errorType === ValidationErrorType.Rejected,
        message: row.message,
      };
    });
  };

  return { contentList };
};
