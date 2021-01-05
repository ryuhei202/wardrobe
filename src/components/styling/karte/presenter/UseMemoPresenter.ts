import MemoNgResponse from "../../../../model/api/response/styling/karte/MemoNgResponse";
import MemoResponse from "../../../../model/api/response/styling/karte/MemoResponse";

export interface MemoPresenter {
  lastCoordinate: () => string[];
  nextCoordinate: () => string[];
  otherNote: () => string[];
  memoNgs: () => MemoNgResponse[];
}

export const useMemoPresenter = (data: MemoResponse): MemoPresenter => {
  const lastCoordinate = (): string[] => {
    if (data.pastOutfits.length === 0) return [];
    return data.pastOutfits[0].feedback.split("\n");
  };

  const nextCoordinate = (): string[] => {
    return data.nextRequest.split("\n");
  };

  const otherNote = (): string[] => {
    return data.otherNote.split("\n");
  };

  const memoNgs = () => data.ngs;

  return { lastCoordinate, nextCoordinate, otherNote, memoNgs };
};
