import GetRequest from "../../GetRequest";
import GetConfirmParams from "./GetConfirmParams";

export const useGetConfirmRequest = (
  karteId: number,
  itemIds: number[]
): GetRequest => {
  const url = (): string => {
    return `styling/browses/confirm`;
  };

  const params = (): GetConfirmParams => {
    return {
      chartId: karteId,
      itemIds: itemIds,
    };
  };

  return { url, params };
};
