import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetAdviceChoiceCaller } from "../../../../model/styling/arrange/api_caller/UseGetAdviceChoiceCaller";
import { ArrangeData } from "../../../../model/styling/arrange/props_data/ArrangeData";
import { Arrange } from "../Arrange";
import { ArrangeCallback } from "../callback/ArrangeCallback";

export interface AdviceChoiceProvider {
  arrangeComponent: (
    data: ArrangeData,
    callback: ArrangeCallback
  ) => JSX.Element;
}

export const useAdviceChoiceProvider = (): AdviceChoiceProvider => {
  const apiCaller = useGetAdviceChoiceCaller();

  const arrangeComponent = (
    data: ArrangeData,
    callback: ArrangeCallback
  ): JSX.Element => {
    if (apiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (apiCaller.errorResponse) {
      return <Typography>{apiCaller.errorResponse.message}</Typography>;
    } else if (apiCaller.response) {
      return (
        <Arrange
          data={data}
          response={apiCaller.response}
          callback={callback}
        />
      );
    } else {
      return <></>;
    }
  };

  return {
    arrangeComponent,
  };
};
