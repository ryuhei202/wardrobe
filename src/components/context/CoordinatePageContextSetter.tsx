import { Typography } from "@mui/material";
import { ReactNode, useContext } from "react";
import { ChartIdContextSetter } from "./ChartIdContextSetter";
import { CoordinateIdContextSetter } from "./CoordinateIdContextSetter";
import { MemberIdContextSetter } from "./MemberIdContextSetter";
import {
  ChartIdContext,
  CoordinateIdContext,
  MemberIdContext,
} from "./provider/ContextProvider";

type TProps = {
  children: ReactNode;
};

export const CoordinatePageContextSetter = ({ children }: TProps) => {
  const chartId = useContext(ChartIdContext).state;
  const coordinateId = useContext(CoordinateIdContext).state;
  const memberId = useContext(MemberIdContext).state;

  return (
    <MemberIdContextSetter>
      <ChartIdContextSetter>
        <CoordinateIdContextSetter>
          {!(memberId && coordinateId && chartId) ? (
            <Typography sx={{ m: "auto" }}>URLが間違っています。</Typography>
          ) : (
            children
          )}
        </CoordinateIdContextSetter>
      </ChartIdContextSetter>
    </MemberIdContextSetter>
  );
};
