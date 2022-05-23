import { NgCategoryIndexResponse } from "../../model/api/response/styling/ngCategory/NgCategoryIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type NgsIndex = {
  readonly data?: NgCategoryIndexResponse;
  readonly error: Error | null;
};

export const useNgCategoriesIndex = (): NgsIndex => {
  const { data, error } = useGetRequest<NgCategoryIndexResponse>("ngs");

  return {
    data,
    error,
  };
};
