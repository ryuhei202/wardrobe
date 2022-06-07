import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { MemberSizeUpdateParams } from "../../model/api/request/styling/member_size/MemberSizeUpdateParams";
import { convertMemberSizeToParams } from "../../model/memberSize/convertMemberSizeToParams";
import { TMemberSizes } from "../../model/memberSize/MemberSizeTypes";

type TArgs = {
  fetchedSizes: TMemberSizes;
  editingSizes: TMemberSizes;
  mutateSizes: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    MemberSizeUpdateParams | undefined,
    unknown
  >;
  isChangedSizes: boolean;
  setSnackBarState: (state: {
    isOpen: boolean;
    severity: "success" | "error";
    text: string;
  }) => void;
};

type TState = {
  handleSubmit: () => void;
};

export const memberSizeContainerHandler = ({
  fetchedSizes,
  editingSizes,
  mutateSizes,
  isChangedSizes,
  setSnackBarState,
}: TArgs): TState => {
  const handleSubmit = () => {
    if (!isChangedSizes) return;

    const params = convertMemberSizeToParams(fetchedSizes, editingSizes);
    mutateSizes(params, {
      onSuccess: () => {
        setSnackBarState({
          isOpen: true,
          severity: "success",
          text: "サイズを更新しました。",
        });
      },
      onError: () => {
        setSnackBarState({
          isOpen: true,
          severity: "error",
          text: "サイズの更新に失敗しました。",
        });
      },
    });
  };

  return { handleSubmit };
};
