import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type KartesIndex = {
  readonly data?: KarteIndexResponse[];
  readonly error: Error | null;
};

type TKartesIndexArg = {
  memberId: number;
  limit?: number;
};
type TKartesIndexParams = {
  limit?: number;
};

export const useKartesIndex = ({
  memberId,
  limit,
}: TKartesIndexArg): KartesIndex => {
  const params = (): TKartesIndexParams => {
    return { limit };
  };
  const { data, error } = useMemberGetRequest<KarteIndexResponse[]>({
    path: "kartes",
    memberId,
    params: params(),
  });

  return {
    data,
    error,
  };
};
