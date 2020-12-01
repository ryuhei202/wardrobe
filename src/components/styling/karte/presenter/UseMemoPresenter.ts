import MemoResponse from "../../../../model/api/response/karte/MemoResponse";

export interface MemoPresenter {
  lastCoordinate: () => string;
  nextCoordinate: () => string;
}

export const useMemoPresenter = (data: MemoResponse): MemoPresenter => {
  const lastCoordinate = (): string => {
    return data.lastCoordinateFeedback;
  };

  const nextCoordinate = (): string => {
    return data.nextCoordinateRequest;
  };

  return { lastCoordinate, nextCoordinate };
};
