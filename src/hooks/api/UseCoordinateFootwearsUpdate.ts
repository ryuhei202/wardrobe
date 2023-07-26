import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { CoordinateIdContext } from "../../components/context/provider/ContextProvider";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateFootwearsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateFootwearsUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateFootwearsUpdateParams = {
  footwearId: number;
};

export const useCoordinateFootwearsUpdate = (): CoordinateFootwearsUpdate => {
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateFootwearsUpdateParams,
    Error
  >(`styling/coordinates/${coordinateId}/coordinate_footwear`);

  return { mutate, isLoading };
};
