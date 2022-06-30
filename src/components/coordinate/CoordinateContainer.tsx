import { CircularProgress, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { CoordinateHearingFetcher } from "../coordinateHearing/CoordinateHearingFetcher";
import { CoordinateMemoFetcher } from "../coordinateMemo/CoordinateMemoFetcher";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { CoordinateTopsRatioFetcher } from "../coordinateTopsRatio.tsx/CoordinateTopsRatioFetcher";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  chartId: number;
};

export const CoordinateContainer = ({ chartId }: TProps) => {
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
          <CoordinateHearingFetcher coordinateId={coordinate.id} />
          <CoordinateTopsRatioFetcher coordinateId={coordinate.id} />
          <CoordinateMemoFetcher coordinateId={coordinate.id} />
          <SelectedReviewContainer coordinateId={coordinate.id} />
          <CoordinatePatternContainer coordinate={coordinate} />
          <Divider variant="fullWidth" />
        </Fragment>
      ))}
    </>
  );
};
