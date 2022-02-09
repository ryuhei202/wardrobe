import { GetConfirmParams } from "../../model/api/request/styling/browse/GetConfirmParams";
import { ConfirmResponse } from "../../model/api/response/styling/browse/ConfirmResponse";
import { useGetRequest } from "./UseGetRequest";

type BrowsesConfirm = {
  readonly data?: ConfirmResponse;
  readonly error: Error | null;
  readonly isFetching: boolean;
};

export const useBrowsesConfirm = ({
  chartId,
  itemIds,
}: GetConfirmParams): BrowsesConfirm => {
  const params = (): GetConfirmParams => {
    return {
      chartId: chartId,
      itemIds: itemIds,
    };
  };
  const { data, error, isFetching } = useGetRequest<ConfirmResponse>(
    "browses/confirm",
    params()
  );

  return {
    data,
    error,
    isFetching,
  };
};
