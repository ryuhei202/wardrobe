import { Alert, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useCoordinateDescriptionsUpdate } from "../../hooks/api/UseCoordinateDescriptionsUpdate";
import { CoordinateDescriptionsShowResponse } from "../../model/api/response/styling/coordinateDescription/CoordinateDescriptionsShowResponse";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { MemoForm } from "../shared/MemoForm";

type TProps = {
  data: CoordinateDescriptionsShowResponse;
  coordinateId: number;
  onUpdateComplete: () => Promise<any>;
};

export const CoordinateDescription = ({
  data,
  coordinateId,
  onUpdateComplete,
}: TProps) => {
  const [text, setText] = useState(data.text ?? "");
  const { mutate, isLoading } = useCoordinateDescriptionsUpdate({
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
            setSnackBarText("根拠説明の変更を保存しました");
          });
        },
        onError: () => {
          setSeverity("error");
          setSnackBarText("根拠説明の変更に失敗しました");
        },
        onSettled: () => {
          setIsSnackBarOpen(true);
        },
      }
    );
  };

  useEffect(() => {
    setText(data.text ?? "");
  }, [coordinateId]);

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
        根拠説明
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
