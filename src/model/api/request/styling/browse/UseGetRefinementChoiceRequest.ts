import GetRequest from "../../GetRequest";
import GetRefinementChoiceParams from "./GetRefinementChoiceParams";

export const useGetRefinementChoiceRequest = (
  chartId: number,
  categoryId: number
): GetRequest => {
  const url = (): string => {
    return `styling/browses/refinement_choice`;
  };

  const params = (): GetRefinementChoiceParams => {
    return {
      chartId: chartId,
      categoryId: categoryId,
    };
  };
  return { url, params };
};
