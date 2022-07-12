import { Alert, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useCoordinateStylistCommentsUpdate } from "../../hooks/api/UseCoordinateStylistCommentsUpdate";
import { CoordinateStylistCommentsShowResponse } from "../../model/api/response/styling/coordinateStylistComment/CoordinateStylistCommentsShowResponse";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { MemoForm } from "../shared/MemoForm";

type TProps = {
  data: CoordinateStylistCommentsShowResponse;
  coordinateId: number;
  onUpdateComplete: () => Promise<any>;
};

export const CoordinateStylistComment = ({
  data,
  coordinateId,
  onUpdateComplete,
}: TProps) => {
  const [text, setText] = useState(data.text ?? "");
  const { mutate, isLoading } = useCoordinateStylistCommentsUpdate({
    coordinateId,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const onPost = () => {
    mutate(
      { text },
      {
        onSuccess: () => {
          onUpdateComplete().then(() => {
            setSeverity("success");
            setSnackBarText("気持ち文章の変更を保存しました");
          });
        },
        onError: () => {
          setSeverity("error");
          setSnackBarText("気持ち文章の変更に失敗しました");
        },
        onSettled: () => {
          setIsSnackBarOpen(true);
        },
      }
    );
  };

  const isTextChanged = data.text === null ? text !== "" : text !== data.text;
  useEffect(() => {
    alertClosedWindow(!isTextChanged);
  }, [isTextChanged]);

  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", padding: "10px 0" }}
      >
        気持ち文章
      </Typography>
      <Box style={{ margin: "0 1em" }}>
        <MemoForm
          value={text}
          onChange={setText}
          onPost={onPost}
          disabled={!isTextChanged || isLoading}
        />
      </Box>
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
