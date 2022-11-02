import { TDeliveryDateShowResponse } from "../../model/api/response/styling/deliveryDate/DeliveryDateShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type TDeliveryDatesShow = {
  readonly data?: TDeliveryDateShowResponse;
  readonly error: Error | null;
};

type TDeliveryDatesShowArg = {
  chartId?: number;
};

export const useDeliveryDatesShow = ({
  chartId,
}: TDeliveryDatesShowArg): TDeliveryDatesShow => {
  const { data, error } = useKarteGetRequest<TDeliveryDateShowResponse>({
    path: "delivery_date",
    chartId,
    isEnabled: chartId !== undefined,
  });

  return {
    data,
    error,
  };
};
