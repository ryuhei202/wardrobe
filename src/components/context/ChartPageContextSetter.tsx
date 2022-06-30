import { Typography } from "@mui/material";
import { ReactNode, useContext } from "react";
import { ChartIdContextSetter } from "./ChartIdContextSetter";
import { MemberIdContextSetter } from "./MemberIdContextSetter";
import { ChartIdContext, MemberIdContext } from "./provider/ContextProvider";

type TProps = {
  children: ReactNode;
};

export const ChartPageContextSetter = ({ children }: TProps) => {
  const chartId = useContext(ChartIdContext).state;
  const memberId = useContext(MemberIdContext).state;
  console.log(!(memberId && chartId));

  return (
    <ChartIdContextSetter>
      <MemberIdContextSetter>
        {!(memberId && chartId) ? (
          <Typography sx={{ m: "auto" }}>URLが間違っています。</Typography>
        ) : (
          children
        )}
      </MemberIdContextSetter>
    </ChartIdContextSetter>
  );
};
