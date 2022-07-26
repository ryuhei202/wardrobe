import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type KartesShow = {
  readonly data?: KarteShowResponse;
  readonly error: Error | null;
};

type TKartesShowArg = {
  chartId: number;
};

export const useKartesShow = ({ chartId }: TKartesShowArg): KartesShow => {
  const { data, error } = useKarteGetRequest<KarteShowResponse>({
    path: "",
    chartId: chartId,
  });

  return {
    data,
    error,
  };
};
