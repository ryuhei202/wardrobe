import { GetDetailFilterParams } from "../../model/api/request/styling/browse/GetDetailFilterParams";
import { GetDetailParams } from "../../model/api/request/styling/browse/GetDetailParams";
import { DetailResponse } from "../../model/api/response/styling/browse/DetailResponse";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { useGetRequest } from "./UseGetRequest";

type BrowsesDetail = {
  readonly data?: DetailResponse;
  readonly error: Error | null;
  readonly isFetching: boolean;
};

export const useBrowsesDetail = ({
  chartId,
  preregisteredItemId,
  refinement,
}: {
  chartId: number;
  preregisteredItemId: number;
  refinement: Refinement;
}): BrowsesDetail => {
  const params = (): GetDetailParams => {
    let filterParams: GetDetailFilterParams = {
      size: refinement.sizeIds,
      partSize: refinement.partSizes,
      ng: refinement.ngIds,
    };
    if (refinement.itemId) filterParams.itemId = refinement.itemId;

    return {
      chartId: chartId,
      preregisteredItemId: preregisteredItemId,
      filter: filterParams,
    };
  };

  const { data, error, isFetching } = useGetRequest<DetailResponse>(
    "browses/detail",
    params()
  );

  return {
    data,
    error,
    isFetching,
  };
};
