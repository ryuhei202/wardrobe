import { CircularProgress, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  chartId: number;
};

export const OldCoordinateContainer = ({ chartId }: TProps) => {
  const { data, error } = useCoordinatesIndex({
    chartId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <>
      {data.coordinates.map((coordinate, index) => (
        <Fragment key={coordinate.id}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            コーデ{index + 1}
          </Typography>
          <SelectedReviewContainer coordinateId={coordinate.id} />
          <CoordinatePatternContainer coordinateId={coordinate.id} />
          <Divider variant="fullWidth" />
        </Fragment>
      ))}
    </>
  );
};
