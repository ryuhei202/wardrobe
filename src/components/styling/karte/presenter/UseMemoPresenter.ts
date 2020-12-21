import MemoResponse from "../../../../model/api/response/styling/karte/MemoResponse";

export interface MemoPresenter {
  lastCoordinate: () => string;
  nextCoordinate: () => string;
}

export const useMemoPresenter = (data: MemoResponse): MemoPresenter => {
  const lastCoordinate = (): string => {
    return data.previousFeedback;
  };

  const nextCoordinate = (): string => {
    return data.nextRequest;
  };

  return { lastCoordinate, nextCoordinate };
};
