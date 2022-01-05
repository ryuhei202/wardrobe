import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type NgsIndex = {
  readonly data?: NgIndexResponse[];
  readonly error: Error | null;
};

export const useNgsIndex = (): NgsIndex => {
  const { data, error } = useMemberGetRequest<NgIndexResponse[]>("ngs");

  return {
    data,
    error,
  };
};
