import { AxiosError, AxiosResponse } from "axios";
import { usePatchRequest } from "./UsePatchRequest";
import { UseMutateFunction } from "react-query";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";

type TKartesUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    TKartesUpdateParams | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type TKartesUpdateParams = {
  hearingCompleted: boolean;
};

type TKartesUpdateArg = {
  chartId: number;
};

export const useKartesUpdate = ({
  chartId,
}: TKartesUpdateArg): TKartesUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TKartesUpdateParams,
    AxiosError<ErrorResponse>
  >(`kartes/${chartId}`);
  return { mutate, isLoading };
};
