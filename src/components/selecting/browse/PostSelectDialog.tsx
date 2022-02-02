import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useBrowsesSelect } from "../../../hooks/api/UseBrowsesSelect";
import { PostSelectCallback } from "./callback/PostSelectCallback";

export interface PostSelectContainerProps {
  selectedItemId: number;
  previousItemId: number | null;
  callback: PostSelectCallback;
}

export const PostSelectDialog = (props: PostSelectContainerProps) => {
  const { mutate, error, isLoading } = useBrowsesSelect(
    props.selectedItemId,
    props.previousItemId
  );
  useEffect(() => {
    mutate(undefined, {
      onSuccess: () => {
        props.callback.onSuccess();
      },
    });
  }, [mutate, props.callback]);
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
