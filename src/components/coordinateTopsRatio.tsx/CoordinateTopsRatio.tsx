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
import { useEffect, useRef, useState } from "react";
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
  const isFirstRendering = useRef(false);

  const isChanged =
    shortSleeveNum !== response.shortSleeveNum ||
    longSleeveNum !== response.longSleeveNum;
  const validateTopsNum = () => {
    return shortSleeveNum !== null && longSleeveNum != null;
  };
  const handleSleeveNum = (value: string) => {
    const num = Number(value);
    return isNaN(num) || num < 0 ? null : num;
  };
  const handleSubmit = (text: string) => {
    mutate(undefined, {
      onSuccess: () => {
        onUpdateComplete().then(() => {
          setSeverity("success");
          setSnackBarText(`${text}を保存しました`);
        });
      },
      onError: () => {
        setSeverity("error");
        setSnackBarText(`${text}の変更に失敗しました`);
      },
      onSettled: () => {
        setIsSnackBarOpen(true);
      },
    });
  };

  useEffect(() => {
    alertClosedWindow(!isChanged);
  }, [isChanged]);

  useEffect(() => {
    isFirstRendering.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    handleSubmit("ジャケットの有無");
  }, [isJacketRequested]);

  return (
    <>
      <Box sx={{ margin: "0 1em" }}>
        {isJacketRequested !== undefined && (
          <FormControlLabel
            control={
              <Switch
                checked={isJacketRequested}
                onChange={() => {
                  setIsJacketRequested((prev) => !prev);
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
              const value = handleSleeveNum(event.target.value);
              setShortSleeveNum(value);
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
              const value = handleSleeveNum(event.target.value);
              setLongSleeveNum(value);
            }}
            style={{ width: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            disabled={!isChanged || !validateTopsNum() || isLoading}
            disableElevation
            onClick={() => handleSubmit("トップス枚数")}
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
