import { AxiosClient } from "./../../model/api/shared/AxiosClient";
import axios, { AxiosResponse } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useContext } from "react";
import { useQuery } from "react-query";
import { ChartIdContext } from "../../components/App";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useKarteGetRequest = <T>(
  path: string
): {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
} => {
  const chartId = useContext(ChartIdContext);
  const { data, isLoading, error } = useQuery<T, Error>(`karte/${path}`, () =>
    AxiosClient.get(`${baseUrl()}/styling/kartes/${chartId}/${path}`).then(
      (r) => r.data
    )
  );

  return {
    data,
    isLoading,
    error,
  };
};
