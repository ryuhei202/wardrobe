import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { useKarteHearingStatusShow } from "../../hooks/api/UseKarteHearingStatusShow";
import { useKarteHearingStatusUpdate } from "../../hooks/api/UseKarteHearingStatusUpdate";
import { useLineMessagesCreate } from "../../hooks/api/UseLineMessagesCreate";
import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { createCoordinateFlexMessage } from "../chart/createCoordinateFlexMessage";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartIdContext } from "../context/provider/ContextProvider";

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
  const chartId = useContextDefinedState(ChartIdContext);
  const queryClient = useQueryClient();
  const [isFirstTransmit, setIsFirstTransmit] = useState(true);
  const messages = createCoordinateFlexMessage({
    descriptionText,
    coordinateItems,
    isFirstTransmit,
    simplifiedHearing,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useLineMessagesCreate();
  const { mutate: mutateStatus } = useKarteHearingStatusUpdate();
  const { data, error } = useKarteHearingStatusShow({ chartId });
  const currentStatus = data?.currentStatus;
  const nextStatuses = data?.nextStatuses;

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

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
        disabled={disabled || isLoading || simplifiedHearing === undefined}
        variant="contained"
        onClick={() => {
          if (
            window.confirm(
              isFirstTransmit
                ? "初回提案として送信してもよろしいでしょうか？"
                : "2回目以降の提案として送信してもよろしいでしょうか？",
            )
          ) {
            mutate(
              { messages },
              {
                onSuccess: () => {
                  setSeverity("success");
                  setSnackBarText("メッセージを送信しました");
                  currentStatus === "確認中" &&
                    nextStatuses &&
                    mutateStatus(
                      { karte_id: chartId, status: nextStatuses[0].id },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries(
                            `styling/kartes/${chartId}/chart_hearing_status`,
                          );
                        },
                        onError: (error) => {
                          alert(error.message);
                        },
                      },
                    );
                },
                onError: () => {
                  setSeverity("error");
                  setSnackBarText("メッセージの送信に失敗しました");
                },
                onSettled: () => {
                  setIsSnackBarOpen(true);
                },
              },
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
