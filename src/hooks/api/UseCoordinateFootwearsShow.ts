import { CoordinateIdContext } from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { TCoordinateFootwearsShowResponse } from "../../model/api/response/styling/coordinateFootwear/TCoordianteFootwearsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinateFootwearsShow = {
  readonly data?: TCoordinateFootwearsShowResponse;
  readonly error: Error | null;
};

export const useCoordinateFootwearsShow = (): CoordinateFootwearsShow => {
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const { data, error } = useGetRequest<TCoordinateFootwearsShowResponse>(
    `coordinates/${coordinateId}/coordinate_footwear`
  );

  return {
    data,
    error,
  };
};
