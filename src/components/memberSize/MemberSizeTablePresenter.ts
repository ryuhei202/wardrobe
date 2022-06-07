import { ComponentProps } from "react";
import {
  TMemberPartSizes,
  TMemberPartSizesKey,
  TMemberPartSizeEditableKey,
  TMemberPartSize,
} from "../../model/memberSize/MemberSizeTypes";
import { MemberSizeNumberInput } from "./input/MemberSizeNumberInput";
import { THandleChangeSize } from "./MemberSizeTableHandler";

type TArgs = {
  handleChangeSize: THandleChangeSize;
  editingSizes: TMemberPartSizes;
  fetchedSizes: TMemberPartSizes;
};
type TState = {
  rowDatas: TRowData[];
};

type TRowData = {
  name: string;
  size: ComponentProps<typeof MemberSizeNumberInput>;
  jacketSize: ComponentProps<typeof MemberSizeNumberInput> | null;
  referenceSize: string;
};

export const memberSizeTablePresenter = ({
  handleChangeSize: handleChange,
  editingSizes,
  fetchedSizes,
}: TArgs): TState => {
  const isChangedSize = (
    partName: TMemberPartSizesKey,
    sizeName: TMemberPartSizeEditableKey
  ) => {
    return fetchedSizes[partName][sizeName] != editingSizes[partName][sizeName];
  };

  const createRowData = ({
    partSize,
    partName,
  }: {
    partSize: TMemberPartSize;
    partName: TMemberPartSizesKey;
  }): TRowData => {
    return {
      name: partSize.label,
      size: {
        value: partSize.size,
        changed: isChangedSize(partName, "size"),
        onChange: (v) => handleChange(partName, "size", v),
      },
      jacketSize:
        partSize.jacketSize !== undefined
          ? {
              value: partSize.jacketSize,
              changed: isChangedSize(partName, "jacketSize"),
              onChange: (v) => handleChange(partName, "jacketSize", v),
            }
          : null,
      referenceSize: `${partSize.referenceSize}cm`,
    };
  };

  const rowDatas = (Object.keys(editingSizes) as TMemberPartSizesKey[]).map(
    (key) => {
      return createRowData({
        partSize: editingSizes[key],
        partName: key,
      });
    }
  );
  return { rowDatas };
};
