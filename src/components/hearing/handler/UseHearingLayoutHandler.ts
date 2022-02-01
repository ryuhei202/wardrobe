import { HearingFormCallback } from "../callback/HearingFormCallback";

type HearingLayoutHandler = {
  readonly hearingFormCallback: () => HearingFormCallback;
};
export const useHearingLayoutHandler = (
  setSeverity: (severity: "success" | "error") => void,
  setIsSnackBarOpen: (isSnackBarOpen: boolean) => void,
  setSnackBarText: (snackBarText?: string) => void
): HearingLayoutHandler => {
  const hearingFormCallback = (): HearingFormCallback => {
    return {
      onSuccess: () => {
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("ヒアリングの変更を保存しました！");
      },
      onFailure: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("ヒアリングの変更に失敗しました");
      },
    };
  };

  return {
    hearingFormCallback,
  };
};
