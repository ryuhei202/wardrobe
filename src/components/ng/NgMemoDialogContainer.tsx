import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { useNgCategoriesIndex } from "../../hooks/api/UseNgCategoriesIndex";
import { useNgsEdit } from "../../hooks/api/UseNgsEdit";
import { NgEditConvertResponse } from "../../model/api/response/styling/ng/NgEditConvertResponse";
import { NgEditResponse } from "../../model/api/response/styling/ng/NgEditResponse";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { NgMemoDialog } from "./NgMemoDialog";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly editingNgId?: number;
};

export const NgMemoDialogContainer = ({
  isOpen,
  onClose,
  editingNgId,
}: TProps) => {
  const KARTE_NUM = 1000;
  const { data: ngCategoryData, error: ngCategoryError } =
    useNgCategoriesIndex();
  const { data: karteData, error: karteError } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
    limit: KARTE_NUM,
  });
  const { data: ngEditData, error: ngEditError } = useNgsEdit({
    ngId: editingNgId,
  });

  if (!ngCategoryData || !karteData || (editingNgId && !ngEditData))
    return <CircularProgress />;
  [ngCategoryError, karteError, ngEditError].forEach((error) => {
    if (error) return <Typography>{error.message}</Typography>;
  });

  const convertNgEditData = (
    ngEditData?: NgEditResponse
  ): NgEditConvertResponse | undefined => {
    if (ngEditData === undefined) return undefined;
    return {
      id: ngEditData.id,
      ngCategoryId: ngEditData.ngCategoryId,
      chartId: ngEditData.chartId ?? undefined,
      chartItemId: ngEditData.chartItemId ?? undefined,
      freeText: ngEditData.freeText,
      itemCategoryNg:
        {
          cateMediumId: ngEditData.itemCategoryNg?.cateMediumId ?? undefined,
          cateSmallId: ngEditData.itemCategoryNg?.cateSmallId ?? undefined,
          isOnlyJacketPlan:
            ngEditData.itemCategoryNg?.isOnlyJacketPlan ?? false,
        } ?? undefined,
      sizeNg:
        {
          cateMediumId: ngEditData.sizeNg?.cateMediumId ?? undefined,
          itemPart: ngEditData.sizeNg?.itemPart ?? undefined,
          itemPartSize: ngEditData.sizeNg?.itemPartSize ?? undefined,
          inequalitySign: ngEditData.sizeNg?.inequalitySign ?? undefined,
        } ?? undefined,
    };
  };

  return (
    <NgMemoDialog
      ngCategoryData={ngCategoryData}
      karteData={karteData}
      ngEditData={convertNgEditData(ngEditData)}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
