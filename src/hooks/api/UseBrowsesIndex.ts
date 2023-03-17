import { Refinement } from "./../../model/selecting/browse/Refinement";
import { GetIndexFilterParams } from "../../model/api/request/styling/browse/GetIndexFilterParams";
import { GetIndexParams } from "../../model/api/request/styling/browse/GetIndexParams";
import { BrowseIndexResponse } from "../../model/api/response/styling/browse/BrowseIndexResponse";
import { useGetRequest } from "./UseGetRequest";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type BrowsesIndex = {
  readonly data?: BrowseIndexResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<BrowseIndexResponse, Error>>;
  readonly isFetching: boolean;
};

type TBrowsesIndexArg = { refinement: Refinement; chartId: number };

export const useBrowsesIndex = ({
  refinement,
  chartId,
}: TBrowsesIndexArg): BrowsesIndex => {
  console.log(refinement);
  const params = (): GetIndexParams => {
    var filterParams: GetIndexFilterParams = {
      smallCategory: refinement.smallCategoryIds,
      size: refinement.sizeIds,
      partSize: refinement.partSizes,
      color: refinement.colorIds,
      pattern: refinement.patternIds,
      logo: refinement.logoIds,
      dropSize: refinement.dropSizes,
      formalRank: {
        min: refinement.formalRank[0] ?? 1,
        max: refinement.formalRank[1] ?? 10,
      },
      ng: refinement.ngIds,
      option: refinement.optionIds,
    };
    if (refinement.mediumCategoryId)
      filterParams.mediumCategory = refinement.mediumCategoryId;
    if (refinement.largeCategoryId)
      filterParams.largeCategory = refinement.largeCategoryId;
    if (refinement.itemId) filterParams.itemId = refinement.itemId;

    return {
      chartId: chartId,
      sort: refinement.sortId,
      page_no: refinement.pageNo,
      filter: filterParams,
    };
  };

  const { data, error, refetch, isFetching } =
    useGetRequest<BrowseIndexResponse>("browses", params());

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
