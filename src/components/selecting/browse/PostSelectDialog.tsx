import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useBrowsesSelect } from "../../../hooks/api/UseBrowsesSelect";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { PostSelectCallback } from "./callback/PostSelectCallback";

export interface PostSelectContainerProps {
  selectedItemId: number;
  previousItemId: number | null;
  callback: PostSelectCallback;
}

export const PostSelectDialog = (props: PostSelectContainerProps) => {
  const { state: chartId } = useContext(ChartIdContext);
  const { mutate, error, isLoading, isIdle } = useBrowsesSelect({
    itemId: props.selectedItemId,
    previousItemId: props.previousItemId,
    chartId: chartId!,
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
