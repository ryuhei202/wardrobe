import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type TNgsNew = {
  readonly data?: NgNewResponse;
  readonly error: Error | null;
};

type TNgsNewArg = {
  memberId: number;
  ngCategoryId?: number;
  onError: () => Promise<unknown> | void;
};
type TNgsNewParams = {
  ngCategoryId?: number;
};

export const useNgsNew = ({
  memberId,
  ngCategoryId,
  onError,
}: TNgsNewArg): TNgsNew => {
  const { data, error } = useMemberGetRequest<NgNewResponse, TNgsNewParams>(
    "ngs/new",
    memberId,
    { ngCategoryId },
    ngCategoryId !== undefined,
    onError
  );

  return {
    data,
    error,
  };
};
