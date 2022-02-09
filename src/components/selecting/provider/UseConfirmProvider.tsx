import { CircularProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useBrowsesConfirm } from "../../../hooks/api/UseBrowsesConfirm";
import { SelectionConfirmData } from "../../../model/selecting/props_data/SelectionConfirmData";
import { ChartIdContext } from "../../provider/ContextProvider";
import { SelectionConfirmCallback } from "../callback/SelectionConfirmCallback";
import { SelectionConfirm } from "../SelectionConfirm";

export interface ConfirmProvider {
  selectionConfirmComponent: (
    response: SelectionConfirmData,
    callback: SelectionConfirmCallback
  ) => JSX.Element;
}

export const useConfirmProvider = (itemIds: number[]): ConfirmProvider => {
  const { state: chartId } = useContext(ChartIdContext);
  const { data, error, isFetching } = useBrowsesConfirm({
    itemIds,
    chartId: chartId!,
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
