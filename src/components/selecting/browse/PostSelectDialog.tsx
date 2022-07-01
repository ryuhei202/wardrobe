import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useBrowsesSelect } from "../../../hooks/api/UseBrowsesSelect";
import {
  ChartIdContext,
  CoordinateIdContext,
} from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { PostSelectCallback } from "./callback/PostSelectCallback";

export interface PostSelectContainerProps {
  selectedItemId: number;
  previousItemId: number | null;
  callback: PostSelectCallback;
}

export const PostSelectDialog = (props: PostSelectContainerProps) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const { mutate, error, isLoading, isIdle } = useBrowsesSelect({
    itemId: props.selectedItemId,
    previousItemId: props.previousItemId,
    coordinateId,
    chartId,
  });
  useEffect(() => {
    if (isIdle) {
      mutate(undefined, {
        onSuccess: () => {
          props.callback.onSuccess();
        },
      });
    }
  }, [mutate, isIdle, props.callback]);

  return (
    <>
      <Dialog open={isLoading} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Dialog open={error !== null} onClose={props.callback.onFailure}>
        <DialogTitle>エラー</DialogTitle>
        <DialogContent>
          <Typography>{error?.message ?? ""}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
