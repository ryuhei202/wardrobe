import { NgsIndexResponse } from "../../model/api/response/styling/ng/NgsIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type NgsIndex = {
  readonly data?: NgsIndexResponse[];
  readonly error: Error | null;
};

export const useNgsIndex = (): NgsIndex => {
  const { data, error } = useMemberGetRequest<NgsIndexResponse[]>("ngs");

  return {
    data,
    error,
  };
};
