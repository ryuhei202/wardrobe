import { ReactNode, useContext, useEffect } from "react";
import { useRouteQuery } from "../../hooks/router/useRouteQuery";
import { MemberIdContext } from "./provider/ContextProvider";
import { validedId } from "./validedId";

type TProps = {
  children: ReactNode;
};

export const MemberIdContextSetter = ({ children }: TProps) => {
  const setMemberId = useContext(MemberIdContext).setter;

  const routeQuery = useRouteQuery();
  const qsMemberId = validedId(routeQuery.get("memberId"));

  useEffect(() => {
    setMemberId(qsMemberId);
  }, [qsMemberId, setMemberId]);

  return <>{children}</>;
};
