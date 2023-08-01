import { TFootwearsIndexResponse } from "../../model/api/response/styling/footwear/TFootwearsIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type FootwearsIndex = {
  readonly data?: TFootwearsIndexResponse;
  readonly error: Error | null;
};

export const useFootwearsIndex = (): FootwearsIndex => {
  const { data, error } =
    useGetRequest<TFootwearsIndexResponse>("styling/footwears");

  return {
    data,
    error,
  };
};
