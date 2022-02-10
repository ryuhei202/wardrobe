import { Typography } from "@mui/material";
import { ReactNode, useContext } from "react";
import { MemberIdContextSetter } from "./MemberIdContextSetter";
import { MemberIdContext } from "./provider/ContextProvider";

type TProps = {
  children: ReactNode;
};

export const HearingContextSetter = ({ children }: TProps) => {
  const memberId = useContext(MemberIdContext).state;

  return (
    <MemberIdContextSetter>
      {!memberId ? (
        <Typography sx={{ m: "auto" }}>URLが間違っています。</Typography>
      ) : (
        children
      )}
    </MemberIdContextSetter>
  );
};
