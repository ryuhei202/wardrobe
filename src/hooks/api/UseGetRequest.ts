import { axiosClient } from "./../../model/api/shared/AxiosClient";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";
import { baseUrl } from "../../model/api/shared/BaseUrl";
import qs from "qs";

export const useGetRequest = <T>(
  path: string,
  params?: {},
  queryKey?: string,
  isEnabled: boolean = true
): {
  data?: T;
  error: Error | null;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<T, Error>>;
  isFetching: boolean;
} => {
  const { data, error, refetch, isFetching } = useQuery<T, Error>(
    queryKey ?? path,
    () =>
      axiosClient
        .get(`${baseUrl()}/styling/${path}`, {
          params,
          paramsSerializer: {
            serialize: (params) =>
              qs.stringify(params, { arrayFormat: "brackets", encode: false }),
          },
        })
        .then((r) => r.data),
    {
      enabled: isEnabled,
    }
  );

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
