import { useContext } from "react";
import { ChartIdContext } from "../../contexts/ChartIdContext";
import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type KartesShow = {
  readonly data?: KarteShowResponse;
  readonly error: Error | null;
};

export const useKartesShow = (): KartesShow => {
  const chartId = useContext(ChartIdContext);
  const { data, error } = useKarteGetRequest<KarteShowResponse>("", chartId);

  return {
    data,
    error,
  };
};
