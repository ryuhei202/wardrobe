import {
  TMemberBasicSizesEditableKey,
  TMemberBasicSizes,
} from "../../model/memberSize/MemberSizeTypes";

export type THandleChangeBasicSize = (
  sizeName: TMemberBasicSizesEditableKey,
  value: number | null
) => void;

type TArgs = {
  editingSizes: TMemberBasicSizes;
  onChangeEditingSizes: (editingSizes: TMemberBasicSizes) => void;
};
type TState = {
  handleChangeSize: THandleChangeBasicSize;
};

export const memberBasicSizeHandler = ({
  editingSizes,
  onChangeEditingSizes,
}: TArgs): TState => {
  const handleChangeSize: THandleChangeBasicSize = (
    sizeName: TMemberBasicSizesEditableKey,
    value: number | null
  ) => {
    onChangeEditingSizes({ ...editingSizes, [sizeName]: value });
  };

  return { handleChangeSize };
};
