import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useLineMessagesCreate } from "../../hooks/api/UseLineMessagesCreate";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { createCoordinateFlexMessage } from "../chart/createCoordinateFlexMessage";

type TProps = {
  descriptionText: string;
  coordinateItems: TCoordinateItem[];
  disabled: boolean;
};

export const CoordinateDescriptionLineSendButton = ({
  descriptionText,
  coordinateItems,
  disabled,
}: TProps) => {
  const [isFirstTransmit, setIsFirstTransmit] = useState(true);
  const messages = createCoordinateFlexMessage({
    coordinateDescription: descriptionText,
    coordinateItems: coordinateItems,
    isFirstTransmit: isFirstTransmit,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useLineMessagesCreate();

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isFirstTransmit}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setIsFirstTransmit(event.target.checked)
            }
            disabled={disabled || isLoading}
          />
        }
        label="初回送信"
      />
      <Button
        disabled={disabled || isLoading}
        variant="contained"
        onClick={() => {
          if (
            window.confirm(
              isFirstTransmit
                ? "初回提案として送信してもよろしいでしょうか？"
                : "2回目以降の提案として送信してもよろしいでしょうか？"
            )
          ) {
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
