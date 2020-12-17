import { useGetRefinementChoiceCaller } from "../../../../model/styling/browse/api_caller/UseGetRefinementChoiceCaller";
import { CircularProgress, Typography } from "@material-ui/core";
import BrowseIndex from "../BrowseIndex";
import React from "react";

export interface RefinementChoiceProvider {
  browseIndexComponent: () => JSX.Element;
}

export const useRefinementChoiceProvider = (): RefinementChoiceProvider => {
  const choiceApiCaller = useGetRefinementChoiceCaller();

  const browseIndexComponent = (): JSX.Element => {
    if (choiceApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (choiceApiCaller.errorResponse) {
      return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
    } else if (choiceApiCaller.response) {
      return <BrowseIndex response={choiceApiCaller.response} />;
    } else {
      return <></>;
    }
  };

  return {
    browseIndexComponent,
  };
};
