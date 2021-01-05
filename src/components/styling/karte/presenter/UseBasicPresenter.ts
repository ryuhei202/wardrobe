import { HostUrl } from "./../../../../model/HostUrl";
import BasicResponse from "../../../../model/api/response/styling/karte/BasicResponse";

export interface BasicPresenter {
  resultList: () => string[];
  memberImageUrl: () => string;
}

export const useBasicPresenter = (data: BasicResponse): BasicPresenter => {
  const resultList = (): string[] => {
    return [
      `プラン：${data.planName}`,
      `出荷予定日：${
        data.shipmentDate
          ? new Date(data.shipmentDate).toLocaleDateString()
          : ""
      }`,
      `カルテID：${data.tChartId}`,
      `パートナーID：${data.tMemberId}`,
      `名前：${data.memberName}(${data.memberAge})`,
      `スタイリスト：${data.stylistName}`,
      `都道府県：${data.memberPrefecture}`,
      `レンタル回数：${data.rentalNum}`,
    ];
  };

  const memberImageUrl = (): string => {
    if (data.memberImages.length === 0) return "";
    return `${HostUrl()}${data.memberImages[0].imagePath.original}`;
  };

  return { resultList, memberImageUrl };
};
