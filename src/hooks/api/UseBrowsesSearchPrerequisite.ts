import { BrowseSearchPrerequisiteResponse } from "../../model/api/response/styling/browse/BrowseSearchPrerequisiteResponse";
import { useGetRequest } from "./UseGetRequest";

type BrowsesSearchPrerequisite = {
  readonly data?: BrowseSearchPrerequisiteResponse;
  readonly error: Error | null;
};

export const useBrowsesSearchPrerequisite = (): BrowsesSearchPrerequisite => {
  const { data, error } = useGetRequest<BrowseSearchPrerequisiteResponse>(
    "browses/search_prerequisite"
  );

  return {
    data,
    error,
  };
};
