import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetDetailCaller } from "../../../../model/selecting/browse/api_caller/UseGetDetailCaller";
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
  const detailApiCaller = useGetDetailCaller(preregisteredItemId, refinement);

  const browseDetailComponent = (
    callback: BrowseDetailCallback,
    previousSelectedItemId: number | null
  ): JSX.Element => {
    if (detailApiCaller.isRunning()) {
      return (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      );
    } else if (detailApiCaller.errorResponse) {
      return (
        <Dialog open={true} onClose={() => callback.onClickBackButton()}>
          <DialogTitle>エラー</DialogTitle>
          <DialogContent>
            <Typography>{detailApiCaller.errorResponse.message}</Typography>
          </DialogContent>
        </Dialog>
      );
    } else if (detailApiCaller.response) {
      return (
        <BrowseDetail
          previousSelectedItemId={previousSelectedItemId}
          response={detailApiCaller.response}
          callback={callback}
        />
      );
    } else {
      return <></>;
    }
  };

  return {
    browseDetailComponent,
  };
};
