import {
  TMemberPartSizesKey,
  TMemberPartSizeEditableKey,
  TMemberPartSizes,
} from "../../model/memberSize/MemberSizeTypes";

export type THandleChangeSize = (
  partName: TMemberPartSizesKey,
  sizeName: TMemberPartSizeEditableKey,
  value: number | null
) => void;

type TArgs = {
  editingSizes: TMemberPartSizes;
  onChangeEditingSizes: (editingSizes: TMemberPartSizes) => void;
};
type TState = {
  handleChangeSize: THandleChangeSize;
};

export const MemberSizeTableHandler = ({
  editingSizes,
  onChangeEditingSizes,
}: TArgs): TState => {
  const handleChangeSize: THandleChangeSize = (
    partName: TMemberPartSizesKey,
    sizeName: TMemberPartSizeEditableKey,
    value: number | null
  ) => {
    const target = { ...editingSizes[partName] };
    target[sizeName] = value;
    onChangeEditingSizes({ ...editingSizes, [partName]: target });
  };

  return { handleChangeSize };
};
