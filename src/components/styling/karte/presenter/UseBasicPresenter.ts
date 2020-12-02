import BasicResponse from "../../../../model/api/response/styling/karte/BasicResponse";

export interface BasicPresenter {
  resultList: () => string[];
}

export const useBasicPresenter = (data: BasicResponse): BasicPresenter => {
  const resultList = (): string[] => {
    return [
      `プラン：${data.planName}`,
      `出荷予定日：${data.shipmentDate.toLocaleDateString()}`,
    ];
  };

  return { resultList };
};
