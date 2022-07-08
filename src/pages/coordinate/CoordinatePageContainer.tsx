import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  ChartIdContext,
  MemberIdContext,
  MemberShowContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import { CoordinatePage } from "./CoordinatePage";

export const CoordinatePageContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const memberId = useContextDefinedState(MemberIdContext);
  const { state: memberShowState, setter: setMemberShowContext } =
    useContext(MemberShowContext);

  const { data: karteShowData, error: karteShowError } = useKartesShow({
    chartId,
  });

  const memberShowRes = useMembersShow({
    memberId,
  });

  useEffect(() => {
    if (
      memberShowState === null ||
      memberShowRes.data?.id !== memberShowState?.data?.id
    ) {
      setMemberShowContext(memberShowRes);
    }
  }, [memberShowRes, memberShowState, setMemberShowContext]);

  if (!karteShowData || memberShowState === null)
    return <CircularProgress sx={{ m: "auto" }} />;
  if (karteShowError)
    return <Typography sx={{ m: "auto" }}>{karteShowError.message}</Typography>;

  return <CoordinatePage />;
};
