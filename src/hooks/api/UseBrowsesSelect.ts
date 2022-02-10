import { ChartIdContext } from "./../../contexts/ChartIdContext";
import { useContext } from "react";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "./UsePostRequest";

interface PostSelectParams {
  itemId: number;
  chartId: number;
  previousItemId?: number;
}
export const useBrowsesSelect = (
  itemId: number,
  previousItemId: number | null
): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isIdle: boolean;
} => {
  const chartId = useContext(ChartIdContext) ?? 0;
  const params = (): PostSelectParams => {
    var params: PostSelectParams = {
      itemId: itemId,
      chartId: chartId,
    };
    if (previousItemId) {
      params.previousItemId = previousItemId;
    }
    return params;
  };

  const { mutate, error, isLoading, isIdle } = usePostRequest(
    "browses/select",
    params()
  );

  return {
    mutate,
    error,
    isLoading,
    isIdle,
  };
};
