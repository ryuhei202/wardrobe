import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useSimplifiedHearingsUpdate } from "../../hooks/api/UseSimplifiedHearingsUpdate";
import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";

type TProps = {
  data: SimplifiedHearingsShowResponse;
  coordinateId: number;
  onUpdateComplete: () => Promise<any>;
};

export const SimplifiedHearing = ({
  data,
  coordinateId,
  onUpdateComplete,
}: TProps) => {
  const [target, setTarget] = useState<string>(data.target ?? "");
  const [scene, setScene] = useState<string>(data.scene ?? "");
  const [impression, setImpression] = useState<string>(data.impression ?? "");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState<string>("");

  const { mutate, isLoading } = useSimplifiedHearingsUpdate({
    coordinateId,
  });

  return (
    <>
      <Box
        sx={{
          margin: "0.5em",
          display: "flex",
          gap: "0 1em",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="意識する相手"
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          style={{
            width: "100%",
          }}
          InputLabelProps={{
            style: { fontSize: 14, color: "#333333" },
          }}
          inputProps={{ style: { fontSize: ".8rem" } }}
        />
        <TextField
          label="シーン"
          value={scene}
          onChange={(event) => setScene(event.target.value)}
          style={{
            width: "100%",
          }}
          InputLabelProps={{
            style: { fontSize: 14, color: "#333333" },
          }}
          inputProps={{ style: { fontSize: ".8rem" } }}
        />
        <TextField
          label="印象"
          value={impression}
          onChange={(event) => setImpression(event.target.value)}
          style={{
            width: "100%",
          }}
          InputLabelProps={{
            style: { fontSize: 14, color: "#333333" },
          }}
          inputProps={{ style: { fontSize: ".8rem" } }}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={!target || !scene || !impression || isLoading}
          disableElevation
          onClick={() => {
            mutate(
              {
                target,
                scene,
                impression,
              },
              {
                onSuccess: () => {
                  onUpdateComplete().then(() => {
                    setSeverity("success");
                    setSnackBarText("簡易ヒアリングを保存しました");
                  });
                },
                onError: () => {
                  setSeverity("error");
                  setSnackBarText("簡易ヒアリングの保存に失敗しました");
                },
                onSettled: () => {
                  setIsSnackBarOpen(true);
                },
              }
            );
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
    </>
  );
};
