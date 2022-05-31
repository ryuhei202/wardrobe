import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../../../hooks/api/UseCoordinatePatternsIndex";
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
  } = useCoordinatePatternsIndex({
    coordinateId: 111111111, // 別タスクで実装するため、コンパイルエラーが出ないように一旦仮置きの数字を置いておく
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
