import { NgEditConvertResponse } from "./../../../model/api/response/styling/ng/NgEditConvertResponse";
import { ChartItemIndexResponse } from "./../../../model/api/response/styling/chartItem/ChartItemIndexResponse";
import { NgNewResponse } from "./../../../model/api/response/styling/ng/NgNewResponse";
import { ItemCategoryNg } from "./../../../model/api/request/styling/ng/ItemCategoryNg";
import { useQueryClient } from "react-query";
import { useChartItemsIndex } from "../../../hooks/api/UseChartItemsIndex";
import { useNgsCreate } from "../../../hooks/api/UseNgsCreate";
import { useNgsNew } from "../../../hooks/api/UseNgsNew";
import { NG_CATEGORY } from "../../../model/selecting/ng/NgCategory";
import { MemberIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { SizeNg } from "../../../model/api/request/styling/ng/SizeNg";
import { useState } from "react";
import { useNgsUpdate } from "../../../hooks/api/UseNgsUpdate";

type NgFormHandlerArg = {
  readonly targetChartId?: number;
  readonly ngCategoryId: number;
  readonly freeText: string;
  readonly chartItemId?: number;
  readonly itemCategoryNg?: ItemCategoryNg;
  readonly sizeNg?: SizeNg;
  readonly ngEditData?: NgEditConvertResponse;
  readonly onClose: () => void;
  readonly setNgCategoryId: React.Dispatch<React.SetStateAction<number>>;
  readonly setItemCategoryNg: React.Dispatch<
    React.SetStateAction<ItemCategoryNg | undefined>
  >;
  readonly setSizeNg: React.Dispatch<React.SetStateAction<SizeNg | undefined>>;
  readonly setChartItemId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};
type UseNgFormHandler = {
  readonly handleChangeNgCategory: (value: number) => void;
  readonly handleChangeChartItem: (chartItemId: number) => void;
  readonly handleClickSubmit: () => void;
  readonly handleClickUpdate: () => void;
  readonly chartItemsData?: ChartItemIndexResponse;
  readonly ngData?: NgNewResponse;
  readonly isCreateLoading: boolean;
  readonly isUpdateLoading: boolean;
  readonly severity: "success" | "error" | undefined;
  readonly isSnackBarOpen: boolean;
  readonly snackBarText: string | undefined;
  readonly setIsSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const useNgFormHandler = ({
  targetChartId,
  ngCategoryId,
  freeText,
  chartItemId,
  itemCategoryNg,
  sizeNg,
  ngEditData,
  onClose,
  setNgCategoryId,
  setItemCategoryNg,
  setSizeNg,
  setChartItemId,
}: NgFormHandlerArg): UseNgFormHandler => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );

  const { data: chartItemsData } = useChartItemsIndex({
    chartId: targetChartId,
    onError: () => {
      setSeverity("error");
      setIsSnackBarOpen(true);
      setSnackBarText("NGメモの取得に失敗しました");
    },
  });
  const { data: ngData } = useNgsNew({
    memberId: useContextDefinedState(MemberIdContext),
    ngCategoryId,
    onError: () => {
      setSeverity("error");
      setIsSnackBarOpen(true);
      setSnackBarText("NGメモの取得に失敗しました");
    },
  });

  const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreateLoading } = useNgsCreate({
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
  });

  const { mutate: updateMutate, isLoading: isUpdateLoading } = useNgsUpdate({
    id: ngEditData?.id as number,
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
  });

  const handleChangeNgCategory = (value: number) => {
    setNgCategoryId(value);
    value === NG_CATEGORY.ITEM_CATEGORY_NG
      ? setItemCategoryNg({ isOnlyJacketPlan: false })
      : setItemCategoryNg(undefined);
    setSizeNg(undefined);
  };
  const handleChangeChartItem = (chartItemId: number) => {
    setChartItemId(chartItemId);
    const selectedChartItem = chartItemsData?.chartItems?.find(
      (chartItem) => chartItem.id === chartItemId
    );
    if (ngCategoryId === NG_CATEGORY.SIZE_NG) {
      setSizeNg({ cateMediumId: selectedChartItem?.cateMediumId });
    } else if (ngCategoryId === NG_CATEGORY.ITEM_CATEGORY_NG) {
      setItemCategoryNg({
        cateMediumId: selectedChartItem?.cateMediumId,
        cateSmallId: selectedChartItem?.cateSmallId,
        isOnlyJacketPlan: false,
      });
    }
  };

  const handleClickSubmit = () => {
    createMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("member/ngs");
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモを保存しました！");
        onClose();
      },
      onError: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの保存に失敗しました");
      },
    });
  };

  const handleClickUpdate = () => {
    updateMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("member/ngs");
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモを更新しました！");
        onClose();
      },
      onError: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの更新に失敗しました");
      },
    });
  };

  return {
    handleChangeNgCategory,
    handleChangeChartItem,
    handleClickSubmit,
    handleClickUpdate,
    chartItemsData,
    ngData,
    isCreateLoading,
    isUpdateLoading,
    severity,
    isSnackBarOpen,
    snackBarText,
    setIsSnackBarOpen,
  };
};
