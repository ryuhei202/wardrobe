import { CircularProgress, Typography } from "@mui/material";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import { Member } from "./Member";

export const MemberContainer = () => {
  const { data, error } = useMembersShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <Member response={data} />;
};
