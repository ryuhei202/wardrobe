import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Coordinate } from "../../components/coordinate/Coordinate";
import { TCoordinate } from "../../model/api/response/styling/coordinate/TCoordinate";

type TProps = {
  coordinates: TCoordinate[];
};

export const ChartMainContents = ({ coordinates }: TProps) => {
  const [selectedCoordinateIndex, setSelectedCoordinateIndex] = useState(0);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedCoordinateIndex}
          onChange={(_, newValue) => setSelectedCoordinateIndex(newValue)}
        >
          {coordinates.map((_, index) => (
            <Tab label={`コーデ${index + 1}`} id={`coordinate-tab-${index}`} />
          ))}
        </Tabs>
      </Box>
      <Coordinate coordinateId={coordinates[selectedCoordinateIndex].id} />
    </Box>
  );
};
