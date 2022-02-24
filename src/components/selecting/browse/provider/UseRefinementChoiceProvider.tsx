import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useBrowsesRefinementChoice } from "../../../../hooks/api/UseBrowsesRefinementChoice";
import { ChartIdContext } from "../../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../../context/UseContextDefinedState";
import { ItemBrowseCallback } from "../callback/ItemBrowseCallback";
import { ItemBrowse } from "../ItemBrowse";

export interface RefinementChoiceProvider {
  itemBrowseComponent: (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ) => JSX.Element;
}

export const useRefinementChoiceProvider = (
  categoryId: number
): RefinementChoiceProvider => {
  const { data, error, refetch, isFetching } = useBrowsesRefinementChoice({
    categoryId,
    chartId: useContextDefinedState(ChartIdContext),
  });

  useEffect(() => {
    refetch();
  }, [refetch, categoryId]);

  const itemBrowseComponent = (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ): JSX.Element => {
    if (!data || isFetching) return <CircularProgress />;
    if (error) return <Typography>{error.message}</Typography>;
    if (data) {
      return (
        <ItemBrowse
          response={data}
          callback={callback}
          currentSelectedItemId={currentSelectedItemId}
        />
      );
    }
    return <></>;
  };

  return {
    itemBrowseComponent,
  };
};
