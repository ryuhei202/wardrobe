import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type KarteShow = {
  readonly data?: KarteShowResponse;
  readonly error: Error | null;
};

export const useKarteShow = (): KarteShow => {
  const { data, error } = useKarteGetRequest<KarteShowResponse>("");

  return {
    data,
    error,
  };
};
