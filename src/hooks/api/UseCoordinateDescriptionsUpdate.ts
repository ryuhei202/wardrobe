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
  >(`coordinates/${coordinateId}/coordinate_descriptions`);

  return { mutate, isLoading };
};
