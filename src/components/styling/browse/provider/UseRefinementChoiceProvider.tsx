import { useGetRefinementChoiceCaller } from "../../../../model/styling/browse/api_caller/UseGetRefinementChoiceCaller";
import { CircularProgress, Typography } from "@material-ui/core";
import ItemBrowse from "../ItemBrowse";
import React from "react";
import ItemBrowseCallback from "../callback/ItemBrowseCallback";

export interface RefinementChoiceProvider {
  itemBrowseComponent: (callback: ItemBrowseCallback) => JSX.Element;
}

export const useRefinementChoiceProvider = (
  categoryId: number,
  silhouetteId: number | null
): RefinementChoiceProvider => {
  const choiceApiCaller = useGetRefinementChoiceCaller(
    categoryId,
    silhouetteId
  );

  const itemBrowseComponent = (callback: ItemBrowseCallback): JSX.Element => {
    if (choiceApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (choiceApiCaller.errorResponse) {
      return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
    } else if (choiceApiCaller.response) {
      return (
        <ItemBrowse response={choiceApiCaller.response} callback={callback} />
      );
    } else {
      return <></>;
    }
  };

  return {
    itemBrowseComponent,
  };
};
