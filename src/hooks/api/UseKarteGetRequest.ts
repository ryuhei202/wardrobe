import { AxiosClient } from "./../../model/api/shared/AxiosClient";
import { useContext } from "react";
import { useQuery } from "react-query";
import { ChartIdContext } from "../../components/App";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useKarteGetRequest = <T>(
  path: string
): {
  data: T | undefined;
  error: Error | null;
} => {
  const chartId = useContext(ChartIdContext);
  const { data, error } = useQuery<T, Error>(`karte/${path}`, () =>
    AxiosClient.get(`${baseUrl()}/styling/kartes/${chartId}/${path}`).then(
      (r) => r.data
    )
  );

  return {
    data,
    error,
  };
};
