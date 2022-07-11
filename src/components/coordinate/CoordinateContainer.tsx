import {
  CircularProgress,
  Divider,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { Coordinate } from "./Coordinate";

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
          <ListSubheader>コーデ {index + 1}</ListSubheader>
          <Coordinate coordinateId={coordinate.id} />
          <Divider variant="fullWidth" />
        </Fragment>
      ))}
    </>
  );
};
