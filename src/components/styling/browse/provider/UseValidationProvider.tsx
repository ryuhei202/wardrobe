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
    return (
      <>
        <Dialog
          open={apiCaller.isRunning()}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <CircularProgress />
        </Dialog>
        <Dialog open={apiCaller.errorResponse !== null}>
          <DialogTitle>エラー</DialogTitle>
          <DialogContent>
            <Typography>{apiCaller.errorResponse?.message ?? ""}</Typography>
          </DialogContent>
        </Dialog>
        <ValidationDialog
          isOpen={apiCaller.response !== null}
          response={apiCaller.response ?? []}
          callback={callback}
        />
      </>
    );
  };

  return {
    validationDialogComponent,
  };
};
