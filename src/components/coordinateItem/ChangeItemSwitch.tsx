import { Alert, FormControlLabel, Snackbar, Switch } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useCoordinateItemsUpdate } from "../../hooks/api/UseCoordinateItemsUpdate";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { CoordinateIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";

type TProps = {
  readonly coordinateItem: TCoordinateItem;
};

export const ChangeItemSwitch = ({ coordinateItem }: TProps) => {
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCoordinateItemsUpdate({
    coordinateItemId: coordinateItem.id,
  });

  const handleSubmit = () => {
    mutate(
      { isChangeItem: !coordinateItem.isChangeItem },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            `coordinates/${coordinateId}/coordinate_items`
          );
          setIsSnackBarOpen(true);
          setSeverity("success");
          setSnackBarText("チェンジアイテムの変更を保存しました");
        },
        onError: () => {
          setIsSnackBarOpen(true);
          setSeverity("error");
          setSnackBarText("チェンジアイテムの変更に失敗しました");
        },
      }
    );
  };

  return (
    <>
      <FormControlLabel
        style={{ paddingLeft: 15 }}
        control={
          <Switch
            checked={coordinateItem.isChangeItem}
            onChange={handleSubmit}
            inputProps={{ "aria-label": "controlled" }}
            disabled={isLoading}
          />
        }
        label="チェンジアイテム"
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
