import { useGetRequest } from "./UseGetRequest";

export type TAdminShowResponse = {
  readonly id: number;
  readonly name: string;
};

type TAdminShow = {
  readonly data?: TAdminShowResponse;
  readonly error: Error | null;
};

type TAdminShowArg = {
  readonly email: string;
};

export const useAdminShow = (params: TAdminShowArg): TAdminShow => {
  const { data, error } = useGetRequest<TAdminShowResponse>(
    "styling/admin",
    params,
  );

  return {
    data,
    error,
  };
};
