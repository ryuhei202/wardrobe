import { CircularProgress, Typography } from "@mui/material";
import { useMemberShow } from "../../hooks/api/UseMemberShow";
import { Member } from "./Member";

export const MemberContainer = () => {
  const { data, isLoading, error } = useMemberShow();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <Member response={data} />;
};
