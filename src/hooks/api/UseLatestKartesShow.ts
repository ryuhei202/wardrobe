import { LatestKarteShowResponse } from "../../model/api/response/styling/latestKarte/LatestKarteShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestKartesShow = {
  readonly data?: LatestKarteShowResponse;
  readonly error: Error | null;
};

export const useLatestKartesShow = (): LatestKartesShow => {
  const { data, error } = useMemberGetRequest<LatestKarteShowResponse>(
    "latest_kartes"
  );

  return {
    data,
    error,
  };
};
