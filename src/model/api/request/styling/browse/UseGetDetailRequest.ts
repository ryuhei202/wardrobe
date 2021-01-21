import Refinement from "../../../../styling/browse/Refinement";
import GetRequest from "../../GetRequest";
import GetDetailParams from "./GetDetailParams";

export const useGetDetailRequest = (
  karteId: number,
  preregisteredItemId: number,
  refinement: Refinement
): GetRequest => {
  const url = (): string => {
    return `styling/browses/detail`;
  };

  const params = (): GetDetailParams => {
    return {
      chartId: karteId,
      preregisteredItemId: preregisteredItemId,
      filter: {
        size: refinement.sizeIds,
        partSize: refinement.partSizes,
        option: refinement.optionIds,
      },
    };
  };

  return { url, params };
};
