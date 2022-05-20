import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type NgsIndex = {
  readonly data?: NgNewResponse[];
  readonly error: Error | null;
};

type TNgsIndexArg = {
  memberId: number;
};

export const useNgsIndex = ({ memberId }: TNgsIndexArg): NgsIndex => {
  const { data, error } = useMemberGetRequest<NgNewResponse[], undefined>(
    "ngs",
    memberId
  );

  return {
    data,
    error,
  };
};
