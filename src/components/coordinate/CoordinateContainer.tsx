import { CircularProgress, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  chartId: number;
};

export const CoordinateContainer = ({ chartId }: TProps) => {
  const { data, error } = useCoordinatesIndex({
    chartId,
  });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return (
    <>
      {data.coordinates.map((coordinate, index) => (
        <Fragment key={index}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", marginLeft: 10 }}
          >
            コーデ{index + 1}
          </Typography>
          <SelectedReviewContainer coordinateId={coordinate.id} />
          <CoordinatePatternContainer coordinate={coordinate} />
          <Divider variant="middle" />
        </Fragment>
      ))}
    </>
  );
};
