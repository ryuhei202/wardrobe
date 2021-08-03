import { InfoResponse } from "../../../../model/api/response/styling/karte/InfoResponse";

interface KartePresenter {
  memberInfoPrimaryText: () => string;
  memberInfoSecondaryText: () => string;
  lastCoordinate: () => string[];
}

export const useKartePresenter = (data: InfoResponse): KartePresenter => {
  const memberInfoPrimaryText = (): string => data.memberName;

  const memberInfoSecondaryText = (): string =>
    `パートナーID:${data.tMemberId}, カルテID:${data.tChartId}`;

  const lastCoordinate = (): string[] => {
    if (data.pastOutfits.length === 0) return [];
    return data.pastOutfits[0].feedback.split("\n");
  };

  return {
    memberInfoPrimaryText,
    memberInfoSecondaryText,
    lastCoordinate,
  };
};
