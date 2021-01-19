import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import ValidationResponse from "../../../../model/api/response/styling/browse/ValidationResponse";
import { useGetValidationCaller } from "../../../../model/styling/browse/api_caller/UseGetValidationCaller";
import ValidationDialogCallback from "../callback/ValidationDialogCallback";
import ValidationDialog from "../ValidationDialog";

export interface ValidationProvider {
  validationDialogComponent: (
    callback: ValidationDialogCallback
  ) => JSX.Element;
}

export const useValidationProvider = (
  onRequestComplete: (response: ValidationResponse[]) => void,
  itemId: number
): ValidationProvider => {
  const apiCaller = useGetValidationCaller(itemId, onRequestComplete);

  const validationDialogComponent = (
    callback: ValidationDialogCallback
  ): JSX.Element => {
    if (apiCaller.isRunning()) {
      return (
        <Dialog open={true} disableBackdropClick disableEscapeKeyDown>
          <CircularProgress />
        </Dialog>
      );
    } else if (apiCaller.errorResponse) {
      return (
        <Dialog open={true} disableBackdropClick={false}>
          <DialogTitle>エラー</DialogTitle>
          <DialogContent>
            <Typography>{apiCaller.errorResponse.message}</Typography>
          </DialogContent>
        </Dialog>
      );
    } else if (apiCaller.response) {
      return (
        <ValidationDialog response={apiCaller.response} callback={callback} />
      );
    } else {
      return <></>;
    }
  };

  return {
    validationDialogComponent,
  };
};
