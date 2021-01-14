import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import FeedbackDialogData from "../../../model/styling/feedback/props_data/FeedbackDialogData";
import FeedbackDialogCallback from "./callback/FeedbackDialogCallback";
import { usePostFeedbackProvider } from "./provider/UsePostFeedbackProvider";

export interface FeedbackDialogProps {
  data: FeedbackDialogData;
  callback: FeedbackDialogCallback;
}

const FeedbackDialog = (props: FeedbackDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [description, setDescription] = useState("");
  const provider = usePostFeedbackProvider(selectedCategory, description);

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
        <Button
          variant="contained"
          color="primary"
          onClick={provider.prepareApiCaller}
        >
          アイテムを変更する
        </Button>
      </Dialog>
      {provider.progressComponent(props.callback)}
    </>
  );
};

export default FeedbackDialog;
