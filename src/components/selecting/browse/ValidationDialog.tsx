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
} from "@mui/material";
import { Error, Warning } from "@mui/icons-material";
import React from "react";
import { ValidationError } from "../../../model/selecting/browse/ValidationError";
import { ValidationDialogCallback } from "./callback/ValidationDialogCallback";
import { useValidationDialogStyle } from "./style/UseValidationDialogStyle";
import { ValidationErrorType } from "../../../model/selecting/browse/ValidationErrorType";

export interface ValidationDialogProps {
  errors: ValidationError[];
  isOpen: boolean;
  callback: ValidationDialogCallback;
}

export const ValidationDialog = (props: ValidationDialogProps) => {
  const classes = useValidationDialogStyle();

  return (
    <Dialog open={props.isOpen} disableEscapeKeyDown>
      <DialogTitle>コーデバリデーション</DialogTitle>
      <DialogContent>
        <List>
          {props.errors.map((content, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                {content.errorType === ValidationErrorType.Rejected ? (
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
