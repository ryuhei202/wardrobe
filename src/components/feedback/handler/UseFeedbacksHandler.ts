import { FeedbackFormCallback } from "../callback/FeedbackFormCallback";

type FeedbacksHandler = {
  readonly feedbackFormCallback: () => FeedbackFormCallback;
};
export const useFeedbacksHandler = (
  setSeverity: (severity: "success" | "error") => void,
  setIsSnackBarOpen: (isSnackBarOpen: boolean) => void,
  setSnackBarText: (snackBarText: string) => void
): FeedbacksHandler => {
  const feedbackFormCallback = (): FeedbackFormCallback => {
    return {
      onSuccess: () => {
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("フィードバックの変更を保存しました！");
      },
      onFailure: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("フィードバックの変更に失敗しました");
      },
    };
  };
  return {
    feedbackFormCallback,
  };
};
