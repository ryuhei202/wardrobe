import { PostRequest } from "../../PostRequest";

interface PostSelectParams {
  itemId: number;
  chartId: number;
  previousItemId?: number;
}

export const usePostSelectRequest = (
  karteId: number,
  itemId: number,
  previousItemId: number | null
): PostRequest => {
  const url = (): string => {
    return "styling/browses/select";
  };

  const params = (): PostSelectParams => {
    var params: PostSelectParams = {
      itemId: itemId,
      chartId: karteId,
    };
    if (previousItemId) {
      params.previousItemId = previousItemId;
    }
    return params;
  };

  return { url, params };
};
