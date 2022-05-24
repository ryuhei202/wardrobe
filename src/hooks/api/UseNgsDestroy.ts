import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useDeleteRequest } from "./UseDeleteRequest";

export const useNgsDestroy = (): {
  mutate: UseMutateFunction<AxiosResponse, unknown, number, unknown>;
  error: Error | null;
  isLoading: boolean;
} => {
  const { mutate, error, isLoading } = useDeleteRequest<number>(`ngs`);

  return {
    mutate,
    error,
    isLoading,
  };
};
