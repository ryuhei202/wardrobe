import { CircularProgress, Typography } from "@mui/material";
import { useLatestStylingReferencesShow } from "../../hooks/api/UseLatestStylingReferencesShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { StylingReferenceList } from "./StylingReferenceList";

export const LatestStylingReferenceContainer = () => {
  const { data, error } = useLatestStylingReferencesShow({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <StylingReferenceList response={data} />;
};
