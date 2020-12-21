import BrowseIndexResponse from "../../../../model/api/response/styling/browse/BrowseIndexResponse";

export interface ItemBrowsePresenter {
  totalItemCount: number;
  currentPage: number;
  totalPageNum: number;
}

export const useItemBrowsePresenter = (
  data: BrowseIndexResponse | null
): ItemBrowsePresenter => {
  const totalItemCount = data?.totalCount ?? 0;
  const currentPage = data?.pageNo ?? 0;
  const totalPageNum = data?.totalPageNum ?? 0;

  return { totalItemCount, currentPage, totalPageNum };
};
