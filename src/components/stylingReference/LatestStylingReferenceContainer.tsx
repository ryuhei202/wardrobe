import { CircularProgress, Typography } from "@mui/material";
import { useLatestStylingReferenceShow } from "../../hooks/api/UseLatestStylingReferenceShow";
import { StylingReferenceList } from "./StylingReferenceList";

export const LatestStylingReferenceContainer = () => {
  const { data, error } = useLatestStylingReferenceShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <StylingReferenceList response={data} />;
};
