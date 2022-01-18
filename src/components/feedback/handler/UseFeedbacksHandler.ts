import { useState } from "react";
import { FeedbackFormCallback } from "../callback/FeedbackFormCallback";

type FeedbacksHandler = {
  readonly severity?: "success" | "error";
  readonly isSnackBarOpen: boolean;
  readonly snackBarText?: string;
  readonly feedbackFormCallback: () => FeedbackFormCallback;
};
export const useFeedbacksHandler = (): FeedbacksHandler => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );
  const feedbackFormCallback = (): FeedbackFormCallback => {
    return {
      onSuccess: () => {
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("フィードバックの変更を保存しました！");
        setTimeout(() => setIsSnackBarOpen(false), 5000);
      },
      onFailure: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("フィードバックの変更に失敗しました");
        setTimeout(() => setIsSnackBarOpen(false), 5000);
      },
    };
  };
  return {
    severity,
    isSnackBarOpen,
    snackBarText,
    feedbackFormCallback,
  };
};
