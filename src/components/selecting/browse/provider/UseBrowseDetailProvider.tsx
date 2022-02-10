import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useBrowsesDetail } from "../../../../hooks/api/UseBrowsesDetail";
import { Refinement } from "../../../../model/selecting/browse/Refinement";
import { BrowseDetail } from "../BrowseDetail";
import { BrowseDetailCallback } from "../callback/BrowseDetailCallback";

export interface BrowseDetailProvider {
  browseDetailComponent: (
    callback: BrowseDetailCallback,
    previousSelectedItemId: number | null
  ) => JSX.Element;
}

export const useBrowseDetailProvider = (
  preregisteredItemId: number,
  refinement: Refinement
): BrowseDetailProvider => {
  const { data, error, isFetching } = useBrowsesDetail(
    preregisteredItemId,
    refinement
  );
  const browseDetailComponent = (
    callback: BrowseDetailCallback,
    previousSelectedItemId: number | null
  ): JSX.Element => {
    if (!data || isFetching) {
      return (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      );
    }
    if (error) {
      return (
        <Dialog open={true} onClose={() => callback.onClickBackButton()}>
          <DialogTitle>エラー</DialogTitle>
          <DialogContent>
            <Typography>{error.message}</Typography>
          </DialogContent>
        </Dialog>
      );
    }
    if (data) {
      return (
        <BrowseDetail
          previousSelectedItemId={previousSelectedItemId}
          response={data}
          callback={callback}
        />
      );
    }
    return <></>;
  };

  return {
    browseDetailComponent,
  };
};
