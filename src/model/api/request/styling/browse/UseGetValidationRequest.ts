import GetRequest from "../../GetRequest";
import GetValidationParams from "./GetValidationParams";

export const useGetValidationRequest = (
  karteId: number,
  itemId: number
): GetRequest => {
  const url = (): string => {
    return `styling/browses/validation`;
  };

  const params = (): GetValidationParams => {
    return {
      chartId: karteId,
      itemId: itemId,
    };
  };

  return { url, params };
};
