import { SelectedReviewFormCallback } from "../callback/SelectedReviewFormCallback";

type SelectedReviewHanlderArgs = {
  setSeverity: (severity: "success" | "error") => void;
  setIsSnackBarOpen: (isSnackBarOpen: boolean) => void;
  setSnackBarText: (snackBarText: string) => void;
};

type SelectedReviewHandler = {
  readonly SelectedReviewFormCallback: () => SelectedReviewFormCallback;
};
export const useSelectedReviewHandler = ({
  setSeverity,
  setIsSnackBarOpen,
  setSnackBarText,
}: SelectedReviewHanlderArgs): SelectedReviewHandler => {
  const SelectedReviewFormCallback = (): SelectedReviewFormCallback => {
    return {
      onSuccess: () => {
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("レビューURLの変更を保存しました！");
      },
      onFailure: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("レビューURLの変更に失敗しました");
      },
    };
  };
  return {
    SelectedReviewFormCallback,
  };
};
