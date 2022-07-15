import { CircularProgress, Typography } from "@mui/material";
import { useBrowsesConfirm } from "../../hooks/api/UseBrowsesConfirm";
import { SelectionConfirmData } from "../../model/selecting/props_data/SelectionConfirmData";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { SelectionConfirmCallback } from "./callback/SelectionConfirmCallback";
import { SelectionConfirm } from "./SelectionConfirm";

export interface SelectionConfirmContainerProps {
  data: SelectionConfirmData;
  callback: SelectionConfirmCallback;
}

export const SelectionConfirmContainer = (
  props: SelectionConfirmContainerProps
) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error, isFetching } = useBrowsesConfirm({
    itemIds: props.data.items.map((item) => item.itemInfo.id),
    chartId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data || isFetching) return <CircularProgress />;
  return (
    <SelectionConfirm
      data={props.data}
      response={data}
      callback={props.callback}
    />
  );
};
