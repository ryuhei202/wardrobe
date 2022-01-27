import { HearingFormCallback } from "./../callback/HearingFormCallback";
import { useState } from "react";

type HearingLayoutHandler = {
  readonly severity?: "success" | "error";
  readonly isSnackBarOpen: boolean;
  readonly snackBarText?: string;
  readonly hearingFormCallback: () => HearingFormCallback;
};
export const useHearingLayoutHandler = (): HearingLayoutHandler => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );

  const hearingFormCallback = (): HearingFormCallback => {
    return {
      onSuccess: () => {
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("ヒアリングの変更を保存しました！");
        setTimeout(() => setIsSnackBarOpen(false), 5000);
      },
      onFailure: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("ヒアリングの変更に失敗しました");
        setTimeout(() => setIsSnackBarOpen(false), 5000);
      },
    };
  };
  return {
    severity,
    isSnackBarOpen,
    snackBarText,
    hearingFormCallback,
  };
};
