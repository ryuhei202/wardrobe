import GetRequest from "../../GetRequest";

export const useGetCategoryChoiceRequest = (): GetRequest => {
  const url = (): string => {
    return `styling/browses/category_choice`;
  };
  return { url };
};
