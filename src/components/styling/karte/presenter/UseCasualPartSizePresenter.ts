import CasualPartSizeResponse from "../../../../model/api/response/styling/karte/CasualPartSizeResponse";

export interface CasualPartSizeElement {
  label: string;
  size: string;
}

export interface CasualPartSizePresenter {
  resultList: () => CasualPartSizeElement[];
}

export const useCasualPartSizePresenter = (
  data: CasualPartSizeResponse
): CasualPartSizePresenter => {
  const resultList = (): CasualPartSizeElement[] => {
    return [
      {
        label: "肩幅(0~+1)",
        size: `${data.shoulder ? data.shoulder : ""}(${
          data.referenceShoulder
        })`,
      },
      {
        label: "バスト(-4~+4)",
        size: `${data.bust ? data.bust : ""}(${data.referenceBust})`,
      },
      {
        label: "着丈(-5~)",
        size: `${data.lengthTop ? data.lengthTop : ""}(${
          data.referenceLengthTop
        })`,
      },
      {
        label: "袖丈(0~+1)",
        size: `${data.lengthArm ? data.lengthArm : ""}(${
          data.referenceLengthArm
        })`,
      },
      {
        label: "首周り(0~+1)",
        size: `${data.roundNeck ? data.roundNeck : ""}`,
      },
      {
        label: "ウエスト(±0)",
        size: `${data.waist ? data.waist : ""}(${data.referenceWaist})`,
      },
      {
        label: "ヒップ(-2~+2)",
        size: `${data.hip ? data.hip : ""}(${data.referenceHip})`,
      },
      {
        label: "もも周り(-2~+2)",
        size: `${data.roundLeg ? data.roundLeg : ""}(${
          data.referenceRoundLeg
        })`,
      },
      { label: "股上", size: `${data.lengthWaist ? data.lengthWaist : ""}` },
      {
        label: "股下(-5~+5)",
        size: `${data.lengthLeg ? data.lengthLeg : ""}(${
          data.referenceLengthLeg
        })`,
      },
      {
        label: "ふくらはぎ(-2~+2)",
        size: `${data.roundCalf ? data.roundCalf : ""}(${
          data.referenceRoundCalf
        })`,
      },
      { label: "足のサイズ", size: `${data.foot ? data.foot : ""}` },
    ];
  };

  return { resultList };
};
