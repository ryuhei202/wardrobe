import { Refinement } from "../../../../styling/browse/Refinement";
import { GetRequest } from "../../GetRequest";
import { GetDetailFilterParams } from "./GetDetailFilterParams";
import { GetDetailParams } from "./GetDetailParams";

export const useGetDetailRequest = (
  karteId: number,
  preregisteredItemId: number,
  refinement: Refinement
): GetRequest => {
  const url = (): string => {
    return `styling/browses/detail`;
  };

  const params = (): GetDetailParams => {
    let filterParams: GetDetailFilterParams = {
      size: refinement.sizeIds,
      partSize: refinement.partSizes,
      ng: refinement.ngIds,
    };
    if (refinement.itemId) filterParams.itemId = refinement.itemId;

    return {
      chartId: karteId,
      preregisteredItemId: preregisteredItemId,
      filter: filterParams,
    };
  };

  return { url, params };
};
