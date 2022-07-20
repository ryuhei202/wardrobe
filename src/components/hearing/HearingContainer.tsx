import { useContext, useEffect } from "react";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  MemberIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { Hearing } from "./Hearing";

export const HearingContainer = () => {
  const memberId = useContextDefinedState(MemberIdContext);
  const { state: memberShowState, setter: setMemberShowContext } =
    useContext(MemberShowContext);

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

  return memberShowState === null ? <></> : <Hearing />;
};
