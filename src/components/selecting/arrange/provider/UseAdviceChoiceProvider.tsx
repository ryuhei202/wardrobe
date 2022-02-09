import { CircularProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useArrangesAdviceChoice } from "../../../../hooks/api/UseArrangesAdviceChoice";
import { ArrangeData } from "../../../../model/selecting/arrange/props_data/ArrangeData";
import { ChartIdContext } from "../../../provider/ContextProvider";
import { Arrange } from "../Arrange";
import { ArrangeCallback } from "../callback/ArrangeCallback";

export interface AdviceChoiceProvider {
  arrangeComponent: (
    data: ArrangeData,
    callback: ArrangeCallback
  ) => JSX.Element;
}

export const useAdviceChoiceProvider = (): AdviceChoiceProvider => {
  const { state: chartId } = useContext(ChartIdContext);
  const { data: response, error, isFetching } = useArrangesAdviceChoice(
    chartId!
  );

  const arrangeComponent = (
    data: ArrangeData,
    callback: ArrangeCallback
  ): JSX.Element => {
    if (!response || isFetching) return <CircularProgress />;
    if (error) return <Typography>{error.message}</Typography>;
    if (response) {
      return <Arrange data={data} response={response} callback={callback} />;
    }
    return <></>;
  };

  return {
    arrangeComponent,
  };
};
