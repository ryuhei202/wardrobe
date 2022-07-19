import { ReactNode, useContext, useEffect } from "react";
import { useRouteQuery } from "../../hooks/router/useRouteQuery";
import { CoordinateIdContext } from "./provider/ContextProvider";
import { validatedId } from "./validatedId";

type TProps = {
  children: ReactNode;
};

export const CoordinateIdContextSetter = ({ children }: TProps) => {
  const setCoordinateId = useContext(CoordinateIdContext).setter;

  const routeQuery = useRouteQuery();
  const qsCoordinateId = validatedId(routeQuery.get("coordinateId"));

  useEffect(() => {
    setCoordinateId(qsCoordinateId);
  }, [qsCoordinateId, setCoordinateId]);

  return <>{children}</>;
};
