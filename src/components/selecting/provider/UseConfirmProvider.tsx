import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetConfirmCaller } from "../../../model/selecting/browse/api_caller/UseGetConfirmCaller";
import { SelectionConfirmData } from "../../../model/selecting/props_data/SelectionConfirmData";
import { SelectionConfirmCallback } from "../callback/SelectionConfirmCallback";
import { SelectionConfirm } from "../SelectionConfirm";

export interface ConfirmProvider {
  selectionConfirmComponent: (
    data: SelectionConfirmData,
    callback: SelectionConfirmCallback
  ) => JSX.Element;
}

export const useConfirmProvider = (itemIds: number[]): ConfirmProvider => {
  const apiCaller = useGetConfirmCaller(itemIds);

  const selectionConfirmComponent = (
    data: SelectionConfirmData,
    callback: SelectionConfirmCallback
  ): JSX.Element => {
    if (apiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (apiCaller.errorResponse) {
      return <Typography>{apiCaller.errorResponse.message}</Typography>;
    } else if (apiCaller.response) {
      return (
        <SelectionConfirm
          data={data}
          response={apiCaller.response}
          callback={callback}
        />
      );
    } else {
      return <></>;
    }
  };

  return {
    selectionConfirmComponent,
  };
};
