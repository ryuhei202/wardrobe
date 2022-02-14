import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useLatestStylingReferencesShow } from "../../hooks/api/UseLatestStylingReferencesShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { StylingReferenceList } from "./StylingReferenceList";

export const LatestStylingReferenceContainer = () => {
  const { data, error } = useLatestStylingReferencesShow({
    memberId: useContext(MemberIdContext).state!,
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <StylingReferenceList response={data} />;
};
