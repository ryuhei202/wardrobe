import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useContext } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../../model/api/shared/BaseUrl";
import { ChartIdContext } from "../../contexts/ChartIdContext";

export const useKarteGetRequest = <T>(
  path: string
): {
  data: T | undefined;
  error: Error | null;
} => {
  const chartId = useContext(ChartIdContext);
  const { data, error } = useQuery<T, Error>(`karte/${path}`, () =>
    axiosClient
      .get(`${baseUrl()}/styling/kartes/${chartId}/${path}`)
      .then((r) => r.data)
  );

  return {
    data,
    error,
  };
};
