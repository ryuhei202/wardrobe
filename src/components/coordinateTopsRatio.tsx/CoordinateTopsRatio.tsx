import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCoordinateTopsRatiosUpdate } from "../../hooks/api/UseCoordinateTopsRatiosUpdate";
import { CoordinateTopsRatiosShowResponse } from "../../model/api/response/styling/coordinateTopsRatio/CoordinateTopsRatiosShowResponse";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";

type TProps = {
  readonly coordinateId: number;
  readonly response: CoordinateTopsRatiosShowResponse;
  readonly onUpdateComplete: () => Promise<any>;
};

export const CoordinateTopsRatio = ({
  coordinateId,
  response,
  onUpdateComplete,
}: TProps) => {
  const [isJacketRequested, setIsJacketRequested] = useState(
    response.jacketOption?.isJacketRequested
  );
  const [shortSleeveNum, setShortSleeveNum] = useState(response.shortSleeveNum);
  const [longSleeveNum, setLongSleeveNum] = useState(response.longSleeveNum);
  const { mutate, isLoading } = useCoordinateTopsRatiosUpdate({
    coordinateId,
    longSleeveNum: longSleeveNum ?? 0,
    shortSleeveNum: shortSleeveNum ?? 0,
    isJacketRequested,
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");

  const isChanged =
    shortSleeveNum !== response.shortSleeveNum ||
    longSleeveNum !== response.longSleeveNum;
  useEffect(() => {
    alertClosedWindow(!isChanged);
  }, [isChanged]);

  const validateTopsNum = () => {
    if (shortSleeveNum === null || longSleeveNum === null) return false;
    if (isJacketRequested)
      return shortSleeveNum + longSleeveNum === response.jacketOption?.topsNum;
    if (response.topsNum === null) return true;
    return shortSleeveNum + longSleeveNum === response.topsNum;
  };

  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", padding: "10px 0" }}
      >
        トップス枚数
      </Typography>
      <Box sx={{ margin: "0 1em" }}>
        {isJacketRequested !== undefined && (
          <FormControlLabel
            control={
              <Switch
                checked={isJacketRequested}
                onChange={(event) => {
                  setIsJacketRequested(event.target.checked);
                }}
              />
            }
            label="ジャケットを含める"
          />
        )}
        <Typography sx={{ margin: "0.5em 0" }}>
          トップス合計枚数：
          {isJacketRequested
            ? response.jacketOption?.topsNum ?? "指定無し"
            : response.topsNum ?? "指定無し"}
        </Typography>
        <Box
          sx={{
            margin: "1em",
            display: "flex",
            gap: "0 3em",
            justifyContent: "space-between",
          }}
        >
          <TextField
            type="number"
            label="半袖枚数"
            error={!validateTopsNum()}
            value={shortSleeveNum}
            required
            onChange={(event) => {
              const value = Number(event.target.value);
              setShortSleeveNum(isNaN(value) ? null : value);
            }}
            style={{ width: "100%" }}
          />
          <TextField
            type="number"
            label="長袖枚数"
            error={!validateTopsNum()}
            value={longSleeveNum}
            required
            onChange={(event) => {
              const value = Number(event.target.value);
              setLongSleeveNum(isNaN(value) ? null : value);
            }}
            style={{ width: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            disabled={!isChanged || !validateTopsNum() || isLoading}
            disableElevation
            onClick={() => {
              mutate(undefined, {
                onSuccess: () => {
                  onUpdateComplete().then(() => {
                    setSeverity("success");
                    setSnackBarText("コーデメモの変更を保存しました");
                  });
                },
                onError: () => {
                  setSeverity("error");
                  setSnackBarText("トップス枚数の変更に失敗しました");
                },
                onSettled: () => {
                  setIsSnackBarOpen(true);
                },
              });
            }}
            style={{ width: "100%" }}
          >
            更新
          </Button>
        </Box>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={5000}
          onClose={() => setIsSnackBarOpen(false)}
        >
          <Alert severity={severity}>{snackBarText}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};
