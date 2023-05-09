import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useCallback, useState } from "react";

import { useCoordinateFormalRanksUpdate } from "../../hooks/api/UseCoordinateFormalRanksUpdate";
import { CoordinateFormalRanksShowResponse } from "../../model/api/response/styling/coordinateFormalRank/CoordinateFormalRanksShowResponse";

type TProps = {
  coordinateId: number;
  response: CoordinateFormalRanksShowResponse;
  onUpdateComplete: () => Promise<any>;
};

export const CoordinateFormalRanks = ({
  coordinateId,
  response,
  onUpdateComplete,
}: TProps) => {
  const [formalRank, setFormalRank] = useState<number>(
    response.formalRank || 0
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useCoordinateFormalRanksUpdate({
    coordinateId,
    formalRank,
  });

  const isChanged = formalRank !== response.formalRank;

  const validateFormalRank = () => {
    return formalRank > 1 && formalRank < 9;
  };
  const handleFormalRank = (value: string) => {
    return Number(value);
  };

  const handleSubmit = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        onUpdateComplete().then(() => {
          setSeverity("success");
          setSnackBarText("キレイ度を保存しました");
        });
      },
      onError: () => {
        setSeverity("error");
        setSnackBarText("キレイ度の変更に失敗しました");
      },
      onSettled: () => {
        setIsSnackBarOpen(true);
      },
    });
  }, [mutate, onUpdateComplete]);
  return (
    <Box sx={{ margin: "0 1em" }}>
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
          label="キレイ度"
          error={!validateFormalRank()}
          value={formalRank}
          required
          onChange={(event) => {
            const value = handleFormalRank(event.target.value);
            setFormalRank(value);
          }}
          style={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={!isChanged || !validateFormalRank() || isLoading}
          disableElevation
          onClick={() => handleSubmit()}
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
  );
};
