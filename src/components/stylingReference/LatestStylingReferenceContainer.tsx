import { CircularProgress, Typography } from "@mui/material";
import { useLatestStylingReferencesShow } from "../../hooks/api/UseLatestStylingReferencesShow";
import { StylingReferenceList } from "./StylingReferenceList";

export const LatestStylingReferenceContainer = () => {
  const { data, error } = useLatestStylingReferencesShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <StylingReferenceList response={data} />;
};
