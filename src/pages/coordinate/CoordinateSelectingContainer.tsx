import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  ChartIdContext,
  CoordinateIdContext,
  MemberIdContext,
  MemberShowContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { Selecting } from "./Selecting";
import { useCoordinateItemsIndex } from "../../hooks/api/UseCoordinateItemsIndex";

export const CoordinateSelectingContainer = () => {
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

  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const { data: coordinateItemsIndexData, error: coordinateItemsIndexError } =
    useCoordinateItemsIndex({ coordinateId });

  useEffect(() => {
    if (
      memberShowState === null ||
      memberShowRes.data?.id !== memberShowState?.data?.id
    ) {
      setMemberShowContext(memberShowRes);
    }
  }, [memberShowRes, memberShowState, setMemberShowContext]);

  if (coordinateItemsIndexError)
    return (
      <Typography sx={{ m: "auto" }}>
        {coordinateItemsIndexError.message}
      </Typography>
    );
  if (karteShowError)
    return <Typography sx={{ m: "auto" }}>{karteShowError.message}</Typography>;

  if (!karteShowData || !memberShowState || !coordinateItemsIndexData)
    return <CircularProgress sx={{ m: "auto" }} />;

  return (
    <Selecting
      karteShowResponse={karteShowData}
      coordinateItemsIndexResponse={coordinateItemsIndexData}
    />
  );
};
