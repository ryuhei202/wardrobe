import { CircularProgress, Typography } from "@mui/material";
import { useBrowsesRefinementChoice } from "../../../hooks/api/UseBrowsesRefinementChoice";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";
import { ItemBrowse } from "./ItemBrowse";

export interface ItemBrowseContainerProps {
  callback: ItemBrowseCallback;
  categoryId: number;
  currentSelectedItemId: number | null;
}

export const ItemBrowseContainer = (props: ItemBrowseContainerProps) => {
  const { data, error, isFetching } = useBrowsesRefinementChoice({
    categoryId: props.categoryId,
    chartId: useContextDefinedState(ChartIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data || isFetching) return <CircularProgress />;

  return (
    <ItemBrowse
      response={data}
      callback={props.callback}
      currentSelectedItemId={props.currentSelectedItemId}
    />
  );
};
