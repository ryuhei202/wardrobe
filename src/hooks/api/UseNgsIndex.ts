import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type NgsIndex = {
  readonly data?: NgIndexResponse[];
  readonly error: Error | null;
};

type TNgsIndexArg = {
  memberId: number;
};

export const useNgsIndex = ({ memberId }: TNgsIndexArg): NgsIndex => {
  const { data, error } = useMemberGetRequest<NgIndexResponse[]>({
    path: "ngs",
    memberId,
  });

  return {
    data,
    error,
  };
};
