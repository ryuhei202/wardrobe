import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import ItemBrowseCallback from "../callback/ItemBrowseCallback";
import { useGetCategoryChoiceCaller } from "../../../../model/styling/browse/api_caller/UseGetCategoryChoiceCaller";
import Browse from "../Browse";

export interface CategoryChoiceProvider {
  browseComponent: (callback: ItemBrowseCallback) => JSX.Element;
}

export const useCategoryChoiceProvider = (): CategoryChoiceProvider => {
  const choiceApiCaller = useGetCategoryChoiceCaller();

  const browseComponent = (callback: ItemBrowseCallback): JSX.Element => {
    if (choiceApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (choiceApiCaller.errorResponse) {
      return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
    } else if (choiceApiCaller.response) {
      return <Browse response={choiceApiCaller.response} callback={callback} />;
    } else {
      return <></>;
    }
  };

  return {
    browseComponent,
  };
};
