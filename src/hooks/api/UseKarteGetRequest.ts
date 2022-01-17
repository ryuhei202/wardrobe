import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useContext } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../../model/api/shared/BaseUrl";
import { ChartIdContext } from "../../contexts/ChartIdContext";

export const useKarteGetRequest = <T>(
  path: string,
  id: number = 0,
  isEnabled: boolean = true
): {
  data: T | undefined;
  error: Error | null;
} => {
  const chartIdContext = useContext(ChartIdContext);
  //カルテIDが引数として指定されている場合は、引数を優先してパスにセットする
  const chartId = id === 0 ? chartIdContext : id;

  const { data, error } = useQuery<T, Error>(
    `karte/${path}`,
    () =>
      axiosClient
        .get(`${baseUrl()}/styling/kartes/${chartId}/${path}`)
        .then((r) => r.data),
    {
      enabled: isEnabled,
    }
  );

  return {
    data,
    error,
  };
};
