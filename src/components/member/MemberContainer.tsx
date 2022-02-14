import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { MemberShowContext } from "../context/provider/ContextProvider";
import { Member } from "./Member";

export const MemberContainer = () => {
  const memberShow = useContext(MemberShowContext).state!;

  if (!memberShow.data) return <CircularProgress />;
  if (memberShow.error)
    return <Typography>{memberShow.error.message}</Typography>;

  return <Member response={memberShow.data} />;
};
