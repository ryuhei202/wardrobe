import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { useNgCategoriesIndex } from "../../hooks/api/UseNgCategoriesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { CreateNgMemoDialog } from "./CreateNgMemoDialog";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

export const CreateNgMemoDialogContainer = ({ isOpen, onClose }: TProps) => {
  const KARTE_NUM = 20;
  const { data: ngCategoryData, error: ngCategoryError } =
    useNgCategoriesIndex();
  const { data: karteData, error: karteError } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
    limit: KARTE_NUM,
  });

  if (!ngCategoryData || !karteData) return <CircularProgress />;
  [ngCategoryError, karteError].forEach((error) => {
    if (error) return <Typography>{error.message}</Typography>;
  });

  return (
    <CreateNgMemoDialog
      ngCategoryData={ngCategoryData}
      karteData={karteData}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
