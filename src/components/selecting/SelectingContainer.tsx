import { CircularProgress, Typography } from "@mui/material";
import qs from "qs";
import React, { useContext } from "react";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import { ChartIdContext, MemberIdContext } from "../provider/ContextProvider";
import { Selecting } from "./Selecting";

export const IsMarriagePlanContext = React.createContext<boolean | undefined>(
  undefined
);

export const SelectingContainer = () => {
  const { state: chartId, setter: setChartId } = useContext(ChartIdContext);
  const { state: memberId, setter: setMemberId } = useContext(MemberIdContext);

  const qsChartId = Number(
    qs.parse(window.location.search.substring(1)).chartId
  );
  setChartId(isNaN(qsChartId) ? null : qsChartId);
  const qsMemberId = Number(
    qs.parse(window.location.search.substring(1)).memberId
  );
  setMemberId(isNaN(qsMemberId) ? null : qsMemberId);

  const { data: karteShowData, error: karteShowError } = useKartesShow(
    chartId!
  );
  const { data: memberShowData, error: memberShowError } = useMembersShow(
    memberId!
  );

  if (!(karteShowData && memberShowData)) return <CircularProgress />;
  if (karteShowError) return <Typography>{karteShowError.message}</Typography>;
  if (memberShowError)
    return <Typography>{memberShowError.message}</Typography>;

  return (
    <IsMarriagePlanContext.Provider value={memberShowData.isMarriagePlan}>
      <Selecting
        karteShowResponse={karteShowData}
        memberShowResponse={memberShowData}
      />
    </IsMarriagePlanContext.Provider>
  );
};
