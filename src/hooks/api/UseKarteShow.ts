import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type KarteShow = {
  readonly data: KarteShowResponse | undefined;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const useKarteShow = (): KarteShow => {
  const { data, isLoading, error } = useKarteGetRequest<KarteShowResponse>("");

  return {
    data,
    isLoading,
    error,
  };
};
