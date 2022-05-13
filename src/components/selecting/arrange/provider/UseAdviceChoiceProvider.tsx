import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatesIndex } from "../../../../hooks/api/UseCoordinatesIndex";
import { ArrangeData } from "../../../../model/selecting/arrange/props_data/ArrangeData";
import { ChartIdContext } from "../../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../../context/UseContextDefinedState";
import { Arrange } from "../Arrange";
import { ArrangeCallback } from "../callback/ArrangeCallback";

export interface AdviceChoiceProvider {
  arrangeComponent: (
    data: ArrangeData,
    callback: ArrangeCallback
  ) => JSX.Element;
}

export const useAdviceChoiceProvider = (): AdviceChoiceProvider => {
  const {
    data: response,
    error,
    isFetching,
  } = useCoordinatesIndex({
    chartId: useContextDefinedState(ChartIdContext),
  });

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
