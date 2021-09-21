import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React, { useState } from "react";
import { HostUrl } from "../../../model/HostUrl";
import { usePostNotifyLostCaller } from "../../../model/styling/feedback/api_caller/UsePostNotifyLostCaller";
import FeedbackDialogData from "../../../model/styling/feedback/props_data/FeedbackDialogData";
import FeedbackDialogCallback from "./callback/FeedbackDialogCallback";

export interface FeedbackDialogProps {
  data: FeedbackDialogData;
  callback: FeedbackDialogCallback;
}

const FeedbackDialog = (props: FeedbackDialogProps) => {
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const apiCaller = usePostNotifyLostCaller(
    selectedItemIds,
    props.callback.onPostComplete
  );

  return (
    <>
      <Dialog
        onClose={props.callback.onClose}
        open={props.data.isOpen}
        fullWidth
        aria-labelledby="feedback-dialog-title"
      >
        <DialogTitle id="feedback-dialog-title">
          アイテム行方不明報告
        </DialogTitle>
        <DialogContent>
          <DialogContentText>行方不明のアイテムを選択する</DialogContentText>
          <List dense>
            {props.data.items.map((item, index) => {
              const labelId = `lost-item-select-${item.itemId}`;
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar
                      variant="square"
                      src={item.imagePath}
                      children={<Image />}
                    />
                  </ListItemIcon>
                  <ListItemText>{`ID: ${item.itemId}, 棚番: ${item.locationName}`}</ListItemText>
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={() => {
                        const currentIndex = selectedItemIds.indexOf(
                          item.itemId
                        );
                        const newChecked = [...selectedItemIds];
                        if (currentIndex === -1) {
                          newChecked.push(item.itemId);
                        } else {
                          newChecked.splice(currentIndex, 1);
                        }
                        setSelectedItemIds(newChecked);
                      }}
                      checked={selectedItemIds.indexOf(item.itemId) !== -1}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={apiCaller.prepare}
          >
            報告
          </Button>
        </DialogActions>
      </Dialog>
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

export default FeedbackDialog;
