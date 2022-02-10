import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  ChartIdContext,
  MemberIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";
import { Selecting } from "./Selecting";

export const SelectingContainer = () => {
  const chartId = useContext(ChartIdContext).state!;
  const memberId = useContext(MemberIdContext).state!;
  const setMemberShowContext = useContext(MemberShowContext).setter;

  const { data: karteShowData, error: karteShowError } = useKartesShow({
    chartId,
  });

  const memberShowRes = useMembersShow({
    memberId,
  });

  useEffect(() => {
    setMemberShowContext(memberShowRes);
  }, [memberShowRes.data?.id, setMemberShowContext]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!karteShowData) return <CircularProgress sx={{ m: "auto" }} />;
  if (karteShowError)
    return <Typography sx={{ m: "auto" }}>{karteShowError.message}</Typography>;

  return <Selecting karteShowResponse={karteShowData} />;
};
