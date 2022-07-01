import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "./UsePostRequest";

interface PostSelectParams {
  itemId: number;
  chartId: number;
  coordinateId: number;
  previousItemId?: number;
}

type TBrowsesSelectArg = {
  chartId: number;
  itemId: number;
  coordinateId: number;
  previousItemId: number | null;
};

export const useBrowsesSelect = ({
  chartId,
  itemId,
  coordinateId,
  previousItemId,
}: TBrowsesSelectArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isIdle: boolean;
} => {
  const params = (): PostSelectParams => {
    var params: PostSelectParams = {
      itemId: itemId,
      chartId: chartId,
      coordinateId,
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
