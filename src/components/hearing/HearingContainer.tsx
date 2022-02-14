import { useContext, useEffect } from "react";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  MemberIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";
import { Hearing } from "./Hearing";

export const HearingContainer = () => {
  const memberId = useContext(MemberIdContext).state!;
  const setMemberShowContext = useContext(MemberShowContext).setter;

  const memberShowRes = useMembersShow({
    memberId,
  });

  useEffect(() => {
    setMemberShowContext(memberShowRes);
  }, [memberShowRes.data?.id, setMemberShowContext]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Hearing />;
};
