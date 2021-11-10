import { GetRequest } from "../../GetRequest";

export const useGetSearchPrerequisiteRequest = (): GetRequest => {
  const url = (): string => {
    return `styling/browses/search_prerequisite`;
  };
  return { url };
};
