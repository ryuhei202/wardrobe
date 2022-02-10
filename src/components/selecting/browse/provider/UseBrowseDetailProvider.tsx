import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useBrowsesDetail } from "../../../../hooks/api/UseBrowsesDetail";
import { Refinement } from "../../../../model/selecting/browse/Refinement";
import { ChartIdContext } from "../../../context/provider/ContextProvider";
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
  const { state: chartId } = useContext(ChartIdContext);
  const { data, error, isFetching } = useBrowsesDetail({
    chartId: chartId!,
    preregisteredItemId,
    refinement,
  });
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
