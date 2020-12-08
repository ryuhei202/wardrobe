import GetRequest from "../../GetRequest";

export const useGetRefinementChoiceRequest = (): GetRequest => {
  const url = (): string => {
    return `styling/browses/refinement_choice`;
  };
  return { url };
};
