import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { ChartIdContext } from "../../components/context/provider/ContextProvider";
import { usePatchRequest } from "./UsePatchRequest";

type KarteHearingStatusUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    KarteHearingStatusUpdateParams | undefined,
    unknown
  >;
  readonly isLoading: boolean;
};

type KarteHearingStatusUpdateParams = {
  karte_id: number;
  status: number;
};

export const useKarteHearingStatusUpdate = (): KarteHearingStatusUpdate => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { mutate, isLoading } = usePatchRequest<
    KarteHearingStatusUpdateParams,
    Error
  >(`styling/kartes/${chartId}/chart_hearing_status`);

  return { mutate, isLoading };
};
