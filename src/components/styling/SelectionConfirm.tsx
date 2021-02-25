import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { Fragment, useState } from "react";
import ConfirmResponse from "../../model/api/response/styling/browse/ConfirmResponse";
import { ValidationErrorType } from "../../model/api/response/styling/browse/ValidationErrorType";
import { usePostRegisterItemsCaller } from "../../model/styling/arrange/api_caller/UsePostRegisterItemsCaller";
import SelectionConfirmData from "../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "./callback/SelectionConfirmCallback";
import FeedbackDialog from "./feedback/FeedbackDialog";
import SelectedItemArray from "./SelectedItemArray";
import { useStylingStyle } from "./style/UseStylingStyle";

export interface SelectionConfirmProps {
  data: SelectionConfirmData;
  response: ConfirmResponse;
  callback: SelectionConfirmCallback;
}

const SelectionConfirm = (props: SelectionConfirmProps) => {
  const classes = useStylingStyle();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [stylist, setStylist] = useState<number | null>(null);
  const apiCaller = usePostRegisterItemsCaller(
    stylist ?? 0,
    props.data.items.map((item) => item.itemId),
    props.callback.onConfirmSelection
  );

  return (
    <>
      <Typography variant="h6" noWrap>
        選択コーデ確認画面
      </Typography>
      <SelectedItemArray data={props.data.items}></SelectedItemArray>
      <Paper className={classes.confirmInfoContainer}>
        <Typography variant="h6" className={classes.confirmInfoTitle}>
          確認要項
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="stylist-select-label">コーデ作成者</InputLabel>
          <Select
            labelId="stylist-select-label"
            label="コーデ作成者"
            value={stylist ?? ""}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setStylist(event.target.value as number);
            }}
          >
            {props.response.stylistChoice.map((stylist) => (
              <MenuItem key={stylist.id} value={stylist.id}>
                {stylist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {props.response.validateErrors.length > 0 ? (
          <Paper>
            <List
              dense
              aria-labelledby="validate-error-list-subheader"
              subheader={
                <ListSubheader id="validated-erro-list-subheader">
                  コーデ登録バリデーション
                </ListSubheader>
              }
            >
              {props.response.validateErrors.map((error, index) => {
                switch (error.errorType) {
                  case ValidationErrorType.Rejected:
                    return (
                      <Alert key={index} severity="error">
                        {error.message}
                      </Alert>
                    );
                  case ValidationErrorType.Unliked:
                    return (
                      <Alert key={index} severity="warning">
                        {error.message}
                      </Alert>
                    );
                  default:
                    return <Fragment key={index}></Fragment>;
                }
              })}
            </List>
          </Paper>
        ) : (
          <></>
        )}
        {props.response.misplacedItems.length > 0 ? (
          <Paper>
            <List
              dense
              aria-labelledby="misplaced-item-list-subheader"
              subheader={
                <ListSubheader id="misplaced-item-list-subheader">
                  下記の忘れ物を確認してください
                </ListSubheader>
              }
            >
              {props.response.misplacedItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <></>
        )}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={classes.changeButton}
        disabled={
          props.response.validateErrors.filter(
            (error) => error.errorType === ValidationErrorType.Rejected
          ).length > 0 || stylist === null
        }
        onClick={() => apiCaller.prepare()}
      >
        確定
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.changeButton}
        onClick={() => setIsFeedbackDialogOpen(true)}
      >
        アイテムを変更する
      </Button>
      <FeedbackDialog
        data={{
          isOpen: isFeedbackDialogOpen,
          itemIds: props.data.items.map((item) => item.itemId),
        }}
        callback={{
          onClose: () => setIsFeedbackDialogOpen(false),
          onPostComplete: props.callback.onCancelSelection,
        }}
      />
      <Dialog
        open={apiCaller.isRunning()}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <CircularProgress />
      </Dialog>
      <Dialog
        open={apiCaller.errorResponse !== null}
        onClose={apiCaller.clearErrorResponse}
      >
        <DialogTitle>エラー</DialogTitle>
        <DialogContent>
          <Typography>{apiCaller.errorResponse?.message ?? ""}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectionConfirm;
