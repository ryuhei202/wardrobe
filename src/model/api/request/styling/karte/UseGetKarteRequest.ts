import GetRequest from "../../GetRequest";

export const useGetKarteRequest = (karteId: number): GetRequest => {
  const url = (): string => {
    return `styling/kartes/${karteId}`;
  };
  return { url };
};
