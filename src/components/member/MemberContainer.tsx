import { CircularProgress, Typography } from "@mui/material";
import { MemberShowContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { Member } from "./Member";

export const MemberContainer = () => {
  const memberShow = useContextDefinedState(MemberShowContext);

  if (!memberShow.data) return <CircularProgress />;
  if (memberShow.error)
    return <Typography>{memberShow.error.message}</Typography>;

  return <Member response={memberShow.data} />;
};
