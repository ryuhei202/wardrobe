import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { ItemBrowseCallback } from "../callback/ItemBrowseCallback";
import { useGetCategoryChoiceCaller } from "../../../../model/styling/browse/api_caller/UseGetCategoryChoiceCaller";
import { Browse } from "../Browse";

export interface CategoryChoiceProvider {
  browseComponent: (
    callback: ItemBrowseCallback,
    previousSelectedItemId: number | null
  ) => JSX.Element;
}

export const useCategoryChoiceProvider = (): CategoryChoiceProvider => {
  const choiceApiCaller = useGetCategoryChoiceCaller();

  const browseComponent = (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ): JSX.Element => {
    if (choiceApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (choiceApiCaller.errorResponse) {
      return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
    } else if (choiceApiCaller.response) {
      return (
        <Browse
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
    browseComponent,
  };
};
