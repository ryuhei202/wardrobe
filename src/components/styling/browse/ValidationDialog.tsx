import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Error, Warning } from "@material-ui/icons";
import React from "react";
import ValidationError from "../../../model/styling/browse/ValidationError";
import ValidationDialogCallback from "./callback/ValidationDialogCallback";
import { useValidationDialogPresenter } from "./presenter/UseValidationDialogPresenter";
import { useValidationDialogStyle } from "./style/UseValidationDialogStyle";

export interface ValidationDialogProps {
  errors: ValidationError[];
  isOpen: boolean;
  callback: ValidationDialogCallback;
}

const ValidationDialog = (props: ValidationDialogProps) => {
  const classes = useValidationDialogStyle();
  const presenter = useValidationDialogPresenter(props.errors);

  return (
    <Dialog open={props.isOpen} disableBackdropClick disableEscapeKeyDown>
      <DialogTitle>コーデバリデーション</DialogTitle>
      <DialogContent>
        <List>
          {presenter.contentList().map((content, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                {content.isRejected ? (
                  <Avatar className={classes.error}>
                    <Error />
                  </Avatar>
                ) : (
                  <Avatar className={classes.warning}>
                    <Warning />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText>{content.message}</ListItemText>
            </ListItem>
          ))}
        </List>
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
