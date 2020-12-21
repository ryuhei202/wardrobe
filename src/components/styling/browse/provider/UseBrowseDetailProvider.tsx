import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGetDetailCaller } from "../../../../model/styling/browse/api_caller/UseGetDetailCaller";
import BrowseDetail from "../BrowseDetail";
import BrowseDetailCallback from "../callback/BrowseDetailCallback";

export interface BrowseDetailProvider {
  browseDetailComponent: (callback: BrowseDetailCallback) => JSX.Element;
}

export const useBrowseDetailProvider = (
  preregisteredItemId: number
): BrowseDetailProvider => {
  const detailApiCaller = useGetDetailCaller(preregisteredItemId);

  const browseDetailComponent = (
    callback: BrowseDetailCallback
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
        <BrowseDetail response={detailApiCaller.response} callback={callback} />
      );
    } else {
      return <></>;
    }
  };

  return {
    browseDetailComponent,
  };
};
