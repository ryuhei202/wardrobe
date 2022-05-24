import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useQuery } from "react-query";
import { baseUrl } from "../../model/api/shared/BaseUrl";

type TKarteGetRequestArg = {
  path: string;
  chartId?: number;
  isEnabled?: boolean;
  onError?: () => Promise<unknown> | void;
};

export const useKarteGetRequest = <T>({
  path,
  chartId,
  onError,
  isEnabled = true,
}: TKarteGetRequestArg): {
  data: T | undefined;
  error: Error | null;
} => {
  if (chartId === undefined) {
    isEnabled = false;
  }
  const { data, error } = useQuery<T, Error>(
    `${chartId}/${path}`,
    () =>
      axiosClient
        .get(`${baseUrl()}/styling/kartes/${chartId}/${path}`)
        .then((r) => r.data),
    {
      enabled: isEnabled,
      onError,
    }
  );

  return {
    data,
    error,
  };
};
