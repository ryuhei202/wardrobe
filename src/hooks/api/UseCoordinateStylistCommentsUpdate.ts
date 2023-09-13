import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateStylistCommentsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateStylistCommentsUpdateParams | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type TCoordinateStylistCommentsUpdateParams = {
  text: string;
};

type TCoordinateStylistCommentsUpdateArgs = {
  coordinateId: number;
};

export const useCoordinateStylistCommentsUpdate = ({
  coordinateId,
}: TCoordinateStylistCommentsUpdateArgs): CoordinateStylistCommentsUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateStylistCommentsUpdateParams,
    Error
  >(`styling/coordinates/${coordinateId}/coordinate_stylist_comment`);

  return { mutate, isLoading };
};
