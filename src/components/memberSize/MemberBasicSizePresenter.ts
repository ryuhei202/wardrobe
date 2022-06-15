import { ComponentProps } from "react";
import { MemberSizeSizeChoiceResponse } from "../../model/api/response/styling/member_size/MemberSizeSizeChoiceResponse";
import {
  TMemberBasicSizes,
  TMemberBasicSizesEditableKey,
} from "../../model/memberSize/MemberSizeTypes";
import { MemberSizeNumberInput } from "./input/MemberSizeNumberInput";
import { MemberSizeSizeSelect } from "./input/MemberSizeSizeSelect";

import { THandleChangeBasicSize } from "./MemberBasicSizeHandler";

type TArgs = {
  editingSizes: TMemberBasicSizes;
  fetchedSizes: TMemberBasicSizes;
  sizeChoiceResponse: MemberSizeSizeChoiceResponse;
  handleChangeSize: THandleChangeBasicSize;
};
type TState = {
  bmi: number;
  tops: string;
  bottoms: string;
  bottomsAdmin: string;
  referenceJacketSize: string;
  heightInputProps: ComponentProps<typeof MemberSizeNumberInput>;
  weightInputProps: ComponentProps<typeof MemberSizeNumberInput>;
  topsAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect>;
  jucketAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect>;
  dropSizeAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect>;
};

export const memberBasicSizePresenter = ({
  editingSizes,
  fetchedSizes,
  sizeChoiceResponse,
  handleChangeSize,
}: TArgs): TState => {
  const isChangedSize = (sizeName: TMemberBasicSizesEditableKey) => {
    return fetchedSizes[sizeName] !== editingSizes[sizeName];
  };

  const bmi = editingSizes.bmi;

  const tops =
    sizeChoiceResponse.sizeTopsChoices.find((c) => c.id === editingSizes.tops)
      ?.name ?? "";

  const bottoms =
    sizeChoiceResponse.sizeBottomsChoices.find(
      (c) => c.id === editingSizes.bottoms
    )?.name ?? "";

  const bottomsAdmin =
    sizeChoiceResponse.sizeBottomsChoices.find(
      (c) => c.id === editingSizes.bottomsAdmin
    )?.name ?? "";

  const referenceJacketSize = () => {
    const jacketSize =
      sizeChoiceResponse.sizeJacketChoices.find(
        (c) => c.id === editingSizes.referenceJacketSize
      )?.name ?? "";

    const dropSize =
      sizeChoiceResponse.sizeDropSizeChoices.find(
        (c) => c.id === editingSizes.referenceJacketDropSize
      )?.name ?? "";

    return `${jacketSize}(${dropSize})`;
  };

  const heightInputProps: ComponentProps<typeof MemberSizeNumberInput> = {
    value: editingSizes.height,
    changed: isChangedSize("height"),
    onChange: (v) => handleChangeSize("height", v),
  };

  const weightInputProps: ComponentProps<typeof MemberSizeNumberInput> = {
    value: editingSizes.weight,
    changed: isChangedSize("weight"),
    onChange: (v) => handleChangeSize("weight", v),
  };

  const topsAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect> = {
    value: editingSizes.topsAdmin,
    changed: isChangedSize("topsAdmin"),
    onChange: (v) => handleChangeSize("topsAdmin", v),
    options: sizeChoiceResponse.sizeTopsChoices,
  };

  const jucketAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect> = {
    value: editingSizes.jacketAdmin,
    changed: isChangedSize("jacketAdmin"),
    onChange: (v) => handleChangeSize("jacketAdmin", v),
    options: sizeChoiceResponse.sizeJacketChoices,
  };

  const dropSizeAdminSelectProps: ComponentProps<typeof MemberSizeSizeSelect> =
    {
      value: editingSizes.dropSizeAdmin,
      changed: isChangedSize("dropSizeAdmin"),
      onChange: (v) => handleChangeSize("dropSizeAdmin", v),
      options: sizeChoiceResponse.sizeDropSizeChoices,
    };

  return {
    bmi,
    tops,
    bottoms,
    bottomsAdmin,
    referenceJacketSize: referenceJacketSize(),
    heightInputProps,
    weightInputProps,
    topsAdminSelectProps,
    jucketAdminSelectProps,
    dropSizeAdminSelectProps,
  };
};
