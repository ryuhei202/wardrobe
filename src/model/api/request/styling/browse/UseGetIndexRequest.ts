import Refinement from "../../../../styling/browse/Refinement";
import GetRequest from "../../GetRequest";
import GetIndexParams from "./GetIndexParams";
import GetIndexFilterParams from "./GetIndexFilterParams";

export const useGetIndexRequest = (
  karteId: number,
  refinement: Refinement
): GetRequest => {
  const url = (): string => {
    return `styling/browses`;
  };

  const params = (): GetIndexParams => {
    var filterParams: GetIndexFilterParams = {
      smallCategory: refinement.smallCategoryIds,
      size: refinement.sizeIds,
      color: refinement.colorIds,
      pattern: refinement.patternIds,
      logo: refinement.logoIds,
      option: refinement.optionIds,
    };
    if (refinement.mediumCategoryId)
      filterParams.mediumCategory = refinement.mediumCategoryId;
    if (refinement.largeCategoryId)
      filterParams.largeCategory = refinement.largeCategoryId;

    return {
      chartId: karteId,
      sort: refinement.sortId,
      page_no: refinement.pageNo,
      filter: filterParams,
    };
  };

  return { url, params };
};
