import SizeResponse from "../../../../model/api/response/styling/karte/SizeResponse";

export interface SizePresenter {
  resultList: () => string[];
}

export const useSizePresenter = (data: SizeResponse): SizePresenter => {
  const resultList = (): string[] => {
    return [
      `身長：${data.height}cm`,
      `体重：${data.weight}kg`,
      `BMI：${data.bmi}`,
      `[ボトムス本人申告]${data.registeredBottomsSize}`,
    ];
  };

  return { resultList };
};
