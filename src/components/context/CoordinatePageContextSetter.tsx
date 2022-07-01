import { Typography } from "@mui/material";
import { ReactNode, useContext } from "react";
import { ChartIdContextSetter } from "./ChartIdContextSetter";
import { CoordinateIdContextSetter } from "./CoordinateIdContextSetter";
import {
  ChartIdContext,
  CoordinateIdContext,
} from "./provider/ContextProvider";

type TProps = {
  children: ReactNode;
};

export const CoordinatePageContextSetter = ({ children }: TProps) => {
  const chartId = useContext(ChartIdContext).state;
  const coordinateId = useContext(CoordinateIdContext).state;

  return (
    <ChartIdContextSetter>
      <CoordinateIdContextSetter>
        {!(coordinateId && chartId) ? (
          <Typography sx={{ m: "auto" }}>URLが間違っています。</Typography>
        ) : (
          children
        )}
      </CoordinateIdContextSetter>
    </ChartIdContextSetter>
  );
};
