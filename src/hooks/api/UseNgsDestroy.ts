import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useDeleteRequest } from "./UseDeleteRequest";

type TNgsDestroyArg = {
  readonly ngId: number;
};

export const useNgsDestroy = ({
  ngId,
}: TNgsDestroyArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isIdle: boolean;
} => {
  const { mutate, error, isLoading, isIdle } = useDeleteRequest(`ngs/${ngId}`);

  return {
    mutate,
    error,
    isLoading,
    isIdle,
  };
};
