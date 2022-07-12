import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type KartesIndex = {
  readonly data?: KarteIndexResponse[];
  readonly error: Error | null;
};

type TKartesIndexArg = {
  memberId: number;
  limit?: number;
  offset?: number;
};
type TKartesIndexParams = {
  limit?: number;
  offset?: number;
};

export const useKartesIndex = ({
  memberId,
  limit,
  offset,
}: TKartesIndexArg): KartesIndex => {
  const { data, error } = useMemberGetRequest<
    KarteIndexResponse[],
    TKartesIndexParams
  >("kartes", memberId, { limit, offset });

  return {
    data,
    error,
  };
};
