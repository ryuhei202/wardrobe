import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { usePostFeedbackCaller } from "../../../../model/styling/feedback/api_caller/UsePostFeedbackCaller";
import FeedbackDialogCallback from "../callback/FeedbackDialogCallback";

export interface PostFeedbackProvider {
  prepareApiCaller: () => void;
  progressComponent: (callback: FeedbackDialogCallback) => JSX.Element;
}

export const usePostFeedbackProvider = (
  category: number,
  description: string
): PostFeedbackProvider => {
  const apiCaller = usePostFeedbackCaller(category, description);

  const prepareApiCaller = () => {
    apiCaller.prepare();
  };

  const progressComponent = (callback: FeedbackDialogCallback): JSX.Element => {
    if (apiCaller.isRunning()) {
      return (
        <Dialog open={true} disableBackdropClick disableEscapeKeyDown>
          <CircularProgress />
        </Dialog>
      );
    } else if (apiCaller.errorResponse) {
      return (
        <Dialog open={true}>
          <DialogTitle>エラー</DialogTitle>
          <DialogContent>
            <Typography>{apiCaller.errorResponse.message}</Typography>
          </DialogContent>
        </Dialog>
      );
    } else if (apiCaller.response) {
      callback.onClickChangeButton();
    }
    return <></>;
  };

  return {
    prepareApiCaller,
    progressComponent,
  };
};
