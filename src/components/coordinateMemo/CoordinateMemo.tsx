import { Alert, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCoordinateMemosUpdate } from "../../hooks/api/UseCoordinateMemosUpdate";
import { CoordinateMemosShowResponse } from "../../model/api/response/styling/coordinateMemo/CoordinateMemosShowResponse";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { MemoForm } from "../shared/MemoForm";

type TProps = {
  readonly coordinateId: number;
  readonly response: CoordinateMemosShowResponse;
  readonly onUpdateComplete: () => Promise<any>;
};

export const CoordinateMemo = ({
  coordinateId,
  response,
  onUpdateComplete,
}: TProps) => {
  const [memo, setMemo] = useState(response.memo);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useCoordinateMemosUpdate({ coordinateId });

  const isMemoChanged = memo !== response.memo;
  useEffect(() => {
    alertClosedWindow(!isMemoChanged);
  }, [isMemoChanged]);

  return (
    <>
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        コーデメモ
      </Typography>
      <MemoForm
        value={memo}
        disabled={response.memo === memo || isLoading}
        onChange={setMemo}
        onPost={() => {
          mutate(
            { memo },
            {
              onSuccess: () => {
                onUpdateComplete().then(() => {
                  setSeverity("success");
                  setSnackBarText("コーデメモの変更を保存しました");
                });
              },
              onError: () => {
                setSeverity("error");
                setSnackBarText("コーデメモの変更に失敗しました");
              },
              onSettled: () => {
                setIsSnackBarOpen(true);
              },
            }
          );
        }}
      />
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
