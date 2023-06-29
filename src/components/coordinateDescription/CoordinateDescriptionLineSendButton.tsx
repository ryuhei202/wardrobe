import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useLineMessagesCreate } from "../../hooks/api/UseLineMessagesCreate";
import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { createCoordinateFlexMessage } from "../chart/createCoordinateFlexMessage";

type TProps = {
  descriptionText: string;
  coordinateItems: TCoordinateItem[];
  disabled: boolean;
  simplifiedHearing?: SimplifiedHearingsShowResponse;
};

export const CoordinateDescriptionLineSendButton = ({
  descriptionText,
  coordinateItems,
  disabled,
  simplifiedHearing,
}: TProps) => {
  const messages = createCoordinateFlexMessage({
    descriptionText,
    coordinateItems,
    simplifiedHearing,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useLineMessagesCreate();

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        disabled={disabled || isLoading || simplifiedHearing === undefined}
        variant="contained"
        onClick={() => {
          if (window.confirm("コーデ提案を送信しますか？")) {
            mutate(
              { messages },
              {
                onSuccess: () => {
                  setSeverity("success");
                  setSnackBarText("メッセージを送信しました");
                },
                onError: () => {
                  setSeverity("error");
                  setSnackBarText("メッセージの送信に失敗しました");
                },
                onSettled: () => {
                  setIsSnackBarOpen(true);
                },
              }
            );
          }
        }}
      >
        LINEで送信する
      </Button>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </Box>
  );
};
