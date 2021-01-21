import ValidationResponse from "../../../../model/api/response/styling/browse/ValidationResponse";
import ValidationDialogCallback from "../callback/ValidationDialogCallback";

export interface ValidationDialogContainerHandler {
  onRequestComplete: (response: ValidationResponse[]) => void;
}

export const useValidationDialogContainerHandler = (
  callback: ValidationDialogCallback
): ValidationDialogContainerHandler => {
  const onRequestComplete = (response: ValidationResponse[]) => {
    if (response.length === 0) callback.onClickSelectButton();
  };

  return {
    onRequestComplete,
  };
};
