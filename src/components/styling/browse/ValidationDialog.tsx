import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import ValidationResponse from "../../../model/api/response/styling/browse/ValidationResponse";
import ValidationDialogCallback from "./callback/ValidationDialogCallback";
import { useValidationDialogPresenter } from "./presenter/UseValidationDialogPresenter";

export interface ValidationDialogProps {
  response: ValidationResponse[];
  callback: ValidationDialogCallback;
}

const ValidationDialog = (props: ValidationDialogProps) => {
  const presenter = useValidationDialogPresenter(props.response);

  return (
    <Dialog open={true} disableBackdropClick disableEscapeKeyDown>
      <DialogTitle>コーデバリデーション</DialogTitle>
      <DialogContent>
        {presenter.contentList().map((content, index) => (
          <Fragment key={index}>
            <Typography
              display="inline"
              color={content.isRejected ? "error" : "secondary"}
            >
              {content.isRejected ? "[要交換]" : "[注意]"}
            </Typography>
            <Typography display="inline">{content.message}</Typography>
          </Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="default"
          onClick={props.callback.onClickSelectButton}
        >
          無視して選択
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.callback.onClickCancelButton}
        >
          別アイテムを選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationDialog;
