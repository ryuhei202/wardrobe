import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type TSimplifiedHearingsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TSimplifiedHearingsUpdateParams | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type TSimplifiedHearingsUpdateParams = {
  readonly target: string;
  readonly scene: string;
  readonly impression: string;
};

type TSimplifiedHearingsUpdateArgs = {
  readonly coordinateId: number;
};

export const useSimplifiedHearingsUpdate = ({
  coordinateId,
}: TSimplifiedHearingsUpdateArgs): TSimplifiedHearingsUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TSimplifiedHearingsUpdateParams,
    Error
  >(`coordinates/${coordinateId}/simplified_hearing`);

  return { mutate, isLoading };
};