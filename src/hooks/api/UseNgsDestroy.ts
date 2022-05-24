import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useDeleteRequest } from "./UseDeleteRequest";

export const useNgsDestroy = (): {
  mutate: UseMutateFunction<AxiosResponse, unknown, number | string, unknown>;
  error: Error | null;
  isLoading: boolean;
} => {
  const { mutate, error, isLoading } = useDeleteRequest<undefined>(`ngs`);

  return {
    mutate,
    error,
    isLoading,
  };
};
