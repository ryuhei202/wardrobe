import { InfoNgCategoryResponse } from "../../../../model/api/response/styling/karte/InfoNgCategoryResponse";
import { NgResponse } from "../../../../model/api/response/styling/karte/NgResponse";

interface NgMemoCollectionPresenter {
  memoNgs: () => InfoNgCategoryResponse[];
  itemListSecondary: (ng: NgResponse) => string;
}

export const useNgMemoCollectionPresenter = (
  data: InfoNgCategoryResponse[]
): NgMemoCollectionPresenter => {
  const memoNgs = () => data;

  const itemListSecondary = (ng: NgResponse): string => {
    let createdAt = `登録日：${new Date(ng.createdAt).toLocaleDateString()}`;
    let updatedAt = `更新日：${new Date(ng.updatedAt).toLocaleDateString()}`;
    let result = createdAt + " " + updatedAt;
    return result;
  };

  return {
    memoNgs,
    itemListSecondary,
  };
};
