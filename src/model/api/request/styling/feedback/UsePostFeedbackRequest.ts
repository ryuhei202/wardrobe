import PostRequest from "../../PostRequest";

interface PostFeedbackParams {
  category: number;
  chartId: number;
  description: string;
  items: number[];
}

export const usePostFeedbackRequest = (
  karteId: number,
  category: number,
  description: string,
  itemIds: number[]
): PostRequest => {
  const url = (): string => {
    return "styling/feedbacks";
  };

  const params = (): PostFeedbackParams => {
    return {
      category: category,
      chartId: karteId,
      description: description,
      items: itemIds,
    };
  };

  return { url, params };
};
