import { CircularProgress, Typography } from "@mui/material";

import { useCoordinatePatternsIndex } from "../../../hooks/api/UseCoordinatePatternsIndex";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { ArrangePattern } from "./ArrangePattern";

export interface ArrangePatternProps {
  data: ArrangeData;
  coordinateId: number;
}

export const ArrangePatternFetcher = ({
  data,
  coordinateId,
}: ArrangePatternProps) => {
  const {
    data: response,
    error,
    isFetching,
  } = useCoordinatePatternsIndex({
    coordinateId: coordinateId,
  });

  if (!response || isFetching) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;

  return (
    <ArrangePattern
      data={data}
      coordinateId={coordinateId}
      response={response}
    />
  );
};
