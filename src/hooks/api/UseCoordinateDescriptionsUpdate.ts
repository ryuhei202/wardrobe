import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateDescriptionsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateDescriptionsUpdateParams | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type TCoordinateDescriptionsUpdateParams = {
  text: string;
};

type TCoordinateDescriptionsUpdateArgs = {
  coordinateId: number;
};

export const useCoordinateDescriptionsUpdate = ({
  coordinateId,
}: TCoordinateDescriptionsUpdateArgs): CoordinateDescriptionsUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateDescriptionsUpdateParams,
    Error
  >(`styling/coordinates/${coordinateId}/coordinate_description`);

  return { mutate, isLoading };
};
