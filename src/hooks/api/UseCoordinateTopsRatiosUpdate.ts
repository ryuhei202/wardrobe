import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { AdminShowContext } from "../../components/context/provider/ContextProvider";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateTopsRatiosUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateTopsRatiosUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateTopsRatiosUpdateParams = {
  longSleeveNum: number;
  shortSleeveNum: number;
  adminId: number;
  isJacketRequested?: boolean;
};

type TCoordinateTopsRatiosUpdateArg = {
  coordinateId: number;
} & Omit<TCoordinateTopsRatiosUpdateParams, "adminId">;

export const useCoordinateTopsRatiosUpdate = ({
  coordinateId,
  longSleeveNum,
  shortSleeveNum,
  isJacketRequested,
}: TCoordinateTopsRatiosUpdateArg): CoordinateTopsRatiosUpdate => {
  const adminShow = useContextDefinedState(AdminShowContext);
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateTopsRatiosUpdateParams,
    Error
  >(`styling/coordinates/${coordinateId}/coordinate_tops_ratios`, {
    longSleeveNum,
    shortSleeveNum,
    isJacketRequested,
    adminId: adminShow.id,
  });

  return { mutate, isLoading };
};
