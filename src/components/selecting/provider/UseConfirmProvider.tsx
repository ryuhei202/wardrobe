import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useBrowsesConfirm } from "../../../hooks/api/UseBrowsesConfirm";
import { SelectionConfirmData } from "../../../model/selecting/props_data/SelectionConfirmData";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { SelectionConfirmCallback } from "../callback/SelectionConfirmCallback";
import { SelectionConfirm } from "../SelectionConfirm";

export interface ConfirmProvider {
  selectionConfirmComponent: (
    response: SelectionConfirmData,
    callback: SelectionConfirmCallback
  ) => JSX.Element;
}

export const useConfirmProvider = (itemIds: number[]): ConfirmProvider => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error, isFetching } = useBrowsesConfirm({
    itemIds,
    chartId,
  });

  const selectionConfirmComponent = (
    response: SelectionConfirmData,
    callback: SelectionConfirmCallback
  ): JSX.Element => {
    if (!data || isFetching) return <CircularProgress />;
    if (error) return <Typography>{error.message}</Typography>;
    if (data)
      return (
        <SelectionConfirm data={response} response={data} callback={callback} />
      );
    return <></>;
  };

  return {
    selectionConfirmComponent,
  };
};
