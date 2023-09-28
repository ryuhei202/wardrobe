import { useMemberSizesUpdate } from "../../hooks/api/UseMemberSizesUpdate";
import { convertMemberSizeToParams } from "../../model/memberSize/convertMemberSizeToParams";
import { TMemberSizes } from "../../model/memberSize/MemberSizeTypes";

type TArgs = {
  fetchedSizes: TMemberSizes;
  editingSizes: TMemberSizes;
  mutateSizes: ReturnType<typeof useMemberSizesUpdate>["mutate"];
  isChangedSizes: boolean;
  setSnackBarState: (state: {
    isOpen: boolean;
    severity: "success" | "error";
    text: string;
  }) => void;
  chartId: number;
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
  chartId,
}: TArgs): TState => {
  const handleSubmit = () => {
    if (!isChangedSizes) return;

    const params = convertMemberSizeToParams(
      fetchedSizes,
      editingSizes,
      chartId,
    );
    mutateSizes(params, {
      onSuccess: () => {
        setSnackBarState({
          isOpen: true,
          severity: "success",
          text: "サイズを更新しました。",
        });
      },
      onError: (e) => {
        setSnackBarState({
          isOpen: true,
          severity: "error",
          text: "サイズの更新に失敗しました。" + e.response?.data.message,
        });
      },
    });
  };

  return { handleSubmit };
};
