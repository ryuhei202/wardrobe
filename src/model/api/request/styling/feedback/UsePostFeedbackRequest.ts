import PostRequest from "../../PostRequest";

interface PostFeedbackParams {
  category: number;
  chartId: number;
  description: string;
}

export const usePostFeedbackRequest = (
  karteId: number,
  category: number,
  description: string
): PostRequest => {
  const url = (): string => {
    return "styling/feedbacks";
  };

  const params = (): PostFeedbackParams => {
    return {
      category: category,
      chartId: karteId,
      description: description,
    };
  };

  return { url, params };
};
