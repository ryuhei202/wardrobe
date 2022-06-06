import { MemberSizeShowResponse } from "../api/response/styling/member_size/MemberSizeShowResponse";
import {
  TMemberBasicSizes,
  TMemberPartSizes,
  TMemberSizes,
} from "./MemberSizeTypes";

export const convertResToMemberSizes = (
  response: MemberSizeShowResponse
): TMemberSizes => {
  const basicSizes = (): TMemberBasicSizes => {
    const {
      sizeTops: tops,
      sizeTopsAdmin: topsAdmin,
      sizeBottoms: bottoms,
      sizeBottomsAdmin: bottomsAdmin,
      sizeJacketAdmin: jacketAdmin,
      sizeDropSizeAdmin: dropSizeAdmin,
      referenceJacketDropSize,
      referenceJacketSize,
      bmi,
      height,
      weight,
    } = response;

    return {
      tops,
      topsAdmin,
      bottoms,
      bottomsAdmin,
      jacketAdmin,
      dropSizeAdmin,
      referenceJacketDropSize,
      referenceJacketSize,
      bmi,
      height,
      weight,
    };
  };

  const partSizes = (): TMemberPartSizes => {
    return {
      sholder: {
        label: "肩幅",
        size: response.shoulder,
        jacketSize: response.shoulderJacket,
        refarenceSize: response.referenceShoulderSize,
      },
      bust: {
        label: "バスト",
        size: response.bust,
        jacketSize: response.bustJacket,
        refarenceSize: response.referenceBustSize,
      },
      lengthTop: {
        label: "着丈",
        size: response.lengthTop,
        jacketSize: response.lengthTopJacket,
        refarenceSize: response.referenceLengthBodySize,
      },
      lengthArm: {
        label: "腕の長さ",
        size: response.lengthArm,
        jacketSize: response.lengthArmJacket,
        refarenceSize: response.referenceLengthArm,
      },
      waist: {
        label: "ウエスト",
        size: response.waist,
        refarenceSize: response.referenceWaistSize,
      },
      hip: {
        label: "ヒップ",
        size: response.hip,
        refarenceSize: response.referenceHipSize,
      },
      roundLeg: {
        label: "もも周り",
        size: response.roundLeg,
        refarenceSize: response.referenceRoundLegSize,
      },
      lengthLeg: {
        label: "股下",
        size: response.lengthLeg,
        refarenceSize: response.referenceLengthLegSize,
      },
      roundCalf: {
        label: "ふくらはぎ周り",
        size: response.roundCalf,
        refarenceSize: response.referenceRoundCalfSize,
      },
    };
  };

  return { basicSizes: basicSizes(), partSizes: partSizes() };
};
