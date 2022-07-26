import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  ChartIdContext,
  MemberIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { Selecting } from "./Selecting";

export const SelectingContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const memberId = useContextDefinedState(MemberIdContext);
  const { state: memberShowState, setter: setMemberShowContext } = useContext(
    MemberShowContext
  );

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

  return <Selecting karteShowResponse={karteShowData} />;
};
