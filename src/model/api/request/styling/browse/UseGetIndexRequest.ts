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
      smallCategory: refinement.smallCategories.map((filter) => filter.id),
      size: refinement.sizes.map((filter) => filter.id),
      color: refinement.colors.map((filter) => filter.id),
      pattern: refinement.patterns.map((filter) => filter.id),
      logo: refinement.logos.map((filter) => filter.id),
      option: refinement.options.map((filter) => filter.id),
    };
    if (refinement.mediumCategory)
      filterParams.mediumCategory = refinement.mediumCategory.id;
    if (refinement.largeCategory)
      filterParams.largeCategory = refinement.largeCategory.id;

    return {
      chartId: karteId,
      sort: refinement.sort,
      page_no: 1,
      filter: filterParams,
    };
  };

  return { url, params };
};
