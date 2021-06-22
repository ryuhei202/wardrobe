import PostRequest from "../../PostRequest";

interface PostNotifyLostParams {
  item_ids: number[];
}

export const usePostNotifyLostRequest = (itemIds: number[]): PostRequest => {
  const url = (): string => {
    return "styling/feedbacks/notify_lost";
  };

  const params = (): PostNotifyLostParams => {
    return {
      item_ids: itemIds,
    };
  };

  return { url, params };
};
