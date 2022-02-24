import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type KartesIndex = {
  readonly data?: KarteIndexResponse[];
  readonly error: Error | null;
};

type TKartesIndexArg = {
  memberId: number;
};

export const useKartesIndex = ({ memberId }: TKartesIndexArg): KartesIndex => {
  const { data, error } = useMemberGetRequest<KarteIndexResponse[]>({
    path: "kartes",
    memberId,
  });

  return {
    data,
    error,
  };
};
