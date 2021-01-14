import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { usePostFeedbackCaller } from "../../../model/styling/feedback/api_caller/UsePostFeedbackCaller";
import FeedbackDialogData from "../../../model/styling/feedback/props_data/FeedbackDialogData";
import FeedbackDialogCallback from "./callback/FeedbackDialogCallback";

export interface FeedbackDialogProps {
  data: FeedbackDialogData;
  callback: FeedbackDialogCallback;
}

const FeedbackDialog = (props: FeedbackDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [description, setDescription] = useState("");
  const apiCaller = usePostFeedbackCaller(
    selectedCategory,
    description,
    props.callback.onPostComplete
  );

  return (
    <>
      <Dialog
        onClose={props.callback.onClose}
        open={props.data.isOpen}
        fullWidth
      >
        <DialogTitle>変更理由</DialogTitle>
        <Select
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value as number);
          }}
        >
          <MenuItem value={1}>アイテム行方不明</MenuItem>
          <MenuItem value={2}>その他</MenuItem>
        </Select>
        <TextField
          label="概要"
          multiline
          variant="outlined"
          rows={4}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></TextField>
        <Button variant="contained" color="primary" onClick={apiCaller.prepare}>
          アイテムを変更する
        </Button>
      </Dialog>
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
    </>
  );
};

export default FeedbackDialog;
