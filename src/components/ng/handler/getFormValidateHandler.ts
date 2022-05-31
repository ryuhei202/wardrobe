import { ItemCategoryNg } from "./../../../model/api/request/styling/ng/ItemCategoryNg";
import { SizeNg } from "./../../../model/api/request/styling/ng/SizeNg";
import { NG_CATEGORY } from "../../../model/selecting/ng/NgCategory";

type FormValidateHandler = {
  readonly isDisabled: boolean;
};
type FormValidateHandlerArg = {
  readonly targetChartId?: number;
  readonly chartItemId?: number;
  readonly ngCategoryId?: number;
  readonly sizeNg?: SizeNg;
  readonly itemCategoryNg?: ItemCategoryNg;
};
export const getFormValidateHandler = ({
  targetChartId,
  chartItemId,
  ngCategoryId,
  sizeNg,
  itemCategoryNg,
}: FormValidateHandlerArg): FormValidateHandler => {
  const isValidAboutChart =
    targetChartId !== undefined ? chartItemId === undefined : false;
  const isValidAboutNgCategoryId = (): boolean => {
    switch (ngCategoryId) {
      case undefined:
        return true;
      case NG_CATEGORY.SIZE_NG:
        const isValidItemPart = sizeNg?.itemPart
          ? sizeNg?.itemPartSize === undefined ||
            sizeNg?.inequalitySign === undefined
          : false;
        return sizeNg?.cateMediumId === undefined || isValidItemPart;
      case NG_CATEGORY.ITEM_CATEGORY_NG:
        return itemCategoryNg?.cateMediumId === undefined;
      default:
        return false;
    }
  };
  const isDisabled = isValidAboutChart || isValidAboutNgCategoryId();

  return { isDisabled };
};
