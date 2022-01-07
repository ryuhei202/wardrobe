import { useGetRefinementChoiceCaller } from "../../../../model/selecting/browse/api_caller/UseGetRefinementChoiceCaller";
import { CircularProgress, Typography } from "@mui/material";
import { ItemBrowse } from "../ItemBrowse";
import React from "react";
import { ItemBrowseCallback } from "../callback/ItemBrowseCallback";

export interface RefinementChoiceProvider {
  itemBrowseComponent: (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ) => JSX.Element;
}

export const useRefinementChoiceProvider = (
  categoryId: number
): RefinementChoiceProvider => {
  const choiceApiCaller = useGetRefinementChoiceCaller(categoryId);

  const itemBrowseComponent = (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ): JSX.Element => {
    if (choiceApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (choiceApiCaller.errorResponse) {
      return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
    } else if (choiceApiCaller.response) {
      return (
        <ItemBrowse
          response={choiceApiCaller.response}
          callback={callback}
          currentSelectedItemId={currentSelectedItemId}
        />
      );
    } else {
      return <></>;
    }
  };

  return {
    itemBrowseComponent,
  };
};
