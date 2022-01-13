import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type KartesIndex = {
  readonly data?: KarteIndexResponse[];
  readonly error: Error | null;
};

export const useKartesIndex = (): KartesIndex => {
  const { data, error } = useMemberGetRequest<KarteIndexResponse[]>("kartes");

  return {
    data,
    error,
  };
};
