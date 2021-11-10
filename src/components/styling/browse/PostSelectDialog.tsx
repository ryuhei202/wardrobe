import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { usePostSelectCaller } from "../../../model/styling/browse/api_caller/UsePostSelectCaller";
import { PostSelectCallback } from "./callback/PostSelectCallback";

export interface PostSelectContainerProps {
  selectedItemId: number;
  previousItemId: number | null;
  callback: PostSelectCallback;
}

export const PostSelectDialog = (props: PostSelectContainerProps) => {
  const apiCaller = usePostSelectCaller(
    props.selectedItemId,
    props.previousItemId,
    props.callback.onSuccess
  );

  return (
    <>
      <Dialog open={apiCaller.isRunning()} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Dialog
        open={apiCaller.errorResponse !== null}
        onClose={props.callback.onFailure}
      >
        <DialogTitle>エラー</DialogTitle>
        <DialogContent>
          <Typography>{apiCaller.errorResponse?.message ?? ""}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
