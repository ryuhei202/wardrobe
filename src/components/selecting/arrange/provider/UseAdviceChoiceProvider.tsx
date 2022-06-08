import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../../../hooks/api/UseCoordinatePatternsIndex";
import { ArrangeData } from "../../../../model/selecting/arrange/props_data/ArrangeData";
import { ArrangePattern } from "../ArrangePattern";

export interface AdviceChoiceProvider {
  arrangePatternComponent: (data: ArrangeData) => JSX.Element;
}

export interface TProps {
  coordinateId: number;
}

export const useAdviceChoiceProvider = ({
  coordinateId,
}: TProps): AdviceChoiceProvider => {
  const {
    data: response,
    error,
    isFetching,
  } = useCoordinatePatternsIndex({
    coordinateId: coordinateId,
  });

  const arrangePatternComponent = (data: ArrangeData): JSX.Element => {
    if (!response || isFetching) return <CircularProgress />;
    if (error) return <Typography>{error.message}</Typography>;
    if (response) {
      return (
        <ArrangePattern
          data={data}
          coordinateId={coordinateId}
          response={response}
        />
      );
    }
    return <></>;
  };

  return {
    arrangePatternComponent,
  };
};
