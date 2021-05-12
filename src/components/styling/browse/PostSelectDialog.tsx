import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { usePostSelectCaller } from "../../../model/styling/browse/api_caller/UsePostSelectCaller";
import PostSelectCallback from "./callback/PostSelectCallback";

export interface PostSelectContainerProps {
  selectedItemId: number;
  previousItemId: number | null;
  callback: PostSelectCallback;
}

const PostSelectDialog = (props: PostSelectContainerProps) => {
  const apiCaller = usePostSelectCaller(
    props.selectedItemId,
    props.previousItemId,
    props.callback.onSuccess
  );

  return (
    <>
      <Dialog
        open={apiCaller.isRunning()}
        disableBackdropClick
        disableEscapeKeyDown
      >
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

export default PostSelectDialog;
