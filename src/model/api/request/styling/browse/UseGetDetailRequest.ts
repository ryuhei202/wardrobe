import GetRequest from "../../GetRequest";
import GetDetailParams from "./GetDetailParams";

export const useGetDetailRequest = (
  karteId: number,
  preregisteredItemId: number
): GetRequest => {
  const url = (): string => {
    return `styling/browses/detail`;
  };

  const params = (): GetDetailParams => {
    return {
      chartId: karteId,
      preregisteredItemId: preregisteredItemId,
    };
  };

  return { url, params };
};
