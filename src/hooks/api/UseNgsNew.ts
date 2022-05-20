import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type NgsNew = {
  readonly data?: NgNewResponse[];
  readonly error: Error | null;
};

type TNgsNewArg = {
  memberId: number;
};

export const useNgsNew = ({ memberId }: TNgsNewArg): NgsNew => {
  const { data, error } = useMemberGetRequest<NgNewResponse[], undefined>(
    "ngs",
    memberId
  );

  return {
    data,
    error,
  };
};
