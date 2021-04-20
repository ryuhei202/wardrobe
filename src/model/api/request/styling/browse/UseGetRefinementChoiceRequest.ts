import GetRequest from "../../GetRequest";
import GetRefinementChoiceParams from "./GetRefinementChoiceParams";

export const useGetRefinementChoiceRequest = (
  chartId: number,
  categoryId: number,
  silhouetteId: number | null
): GetRequest => {
  const url = (): string => {
    return `styling/browses/refinement_choice`;
  };

  const params = (): GetRefinementChoiceParams => {
    var params: GetRefinementChoiceParams = {
      chartId: chartId,
      categoryId: categoryId,
    };
    if (silhouetteId) params.silhouetteId = silhouetteId;
    return params;
  };
  return { url, params };
};
