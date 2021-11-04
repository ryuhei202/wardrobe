import { GetRequest } from "../../GetRequest";
import { GetAdviceChoiceParams } from "./GetAdviceChoiceParams";

export const useGetAdviceChoiceRequest = (karteId: number): GetRequest => {
  const url = (): string => {
    return `styling/arranges/advice_choice`;
  };

  const params = (): GetAdviceChoiceParams => {
    return { chartId: karteId };
  };
  return { url, params };
};
