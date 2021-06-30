import { InfoNgResponse } from "../../../../model/api/response/styling/karte/InfoNgResponse";
import { InfoResponse } from "../../../../model/api/response/styling/karte/InfoResponse";

interface KartePresenter {
  memberInfoPrimaryText: () => string;
  memberInfoSecondaryText: () => string;
  lastCoordinate: () => string[];
  memoNgs: () => InfoNgResponse[];
  ngTimestamp: (index: number) => string;
}

export const useKartePresenter = (data: InfoResponse): KartePresenter => {
  const memberInfoPrimaryText = (): string => data.memberName;

  const memberInfoSecondaryText = (): string =>
    `パートナーID:${data.tMemberId}, カルテID:${data.tChartId}`;

  const lastCoordinate = (): string[] => {
    if (data.pastOutfits.length === 0) return [];
    return data.pastOutfits[0].feedback.split("\n");
  };

  const memoNgs = () => data.ngs;

  const ngTimestamp = (index: number): string =>
    `作成日:${new Date(
      data.ngs[index].createdAt
    ).toLocaleDateString()}　更新日:${new Date(
      data.ngs[index].updatedAt
    ).toLocaleDateString()}`;

  return {
    memberInfoPrimaryText,
    memberInfoSecondaryText,
    lastCoordinate,
    memoNgs,
    ngTimestamp,
  };
};
