import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  MemberIdContext,
  MemberShowContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import { ChartPage } from "./ChartPage";

export const ChartPageContainer = () => {
  const memberId = useContextDefinedState(MemberIdContext);
  const { state: memberShowState, setter: setMemberShowContext } = useContext(
    MemberShowContext
  );

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

  if (memberShowState === null) return <CircularProgress sx={{ m: "auto" }} />;

  return <ChartPage />;
};
