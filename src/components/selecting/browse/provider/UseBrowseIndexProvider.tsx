import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Refinement } from "../../../../model/selecting/browse/Refinement";
import { useGetIndexCaller } from "../../../../model/selecting/browse/api_caller/UseGetIndexCaller";
import { ItemCardCollection } from "../ItemCardCollection";
import { Pagination } from "@mui/material";
import { ItemCardCollectionCallback } from "../callback/ItemCardCollectionCallback";
import { ItemBrowsePaginationCallback } from "../callback/ItemBrowsePaginationCallback";

export interface BrowseIndexProvider {
  totalItemCountComponent: () => JSX.Element;
  itemCardCollectionComponent: (
    callback: ItemCardCollectionCallback
  ) => JSX.Element;
  paginationComponent: (callback: ItemBrowsePaginationCallback) => JSX.Element;
}

export const useBrowseIndexProvider = (
  refinement: Refinement
): BrowseIndexProvider => {
  const searchApiCaller = useGetIndexCaller(refinement);

  const totalItemCountComponent = (): JSX.Element => {
    const totalCount = searchApiCaller.response?.totalCount ?? 0;
    return (
      <Typography paragraph={true}>
        検索結果
        <br />
        {totalCount}件
      </Typography>
    );
  };

  const itemCardCollectionComponent = (
    callback: ItemCardCollectionCallback
  ): JSX.Element => {
    if (searchApiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (searchApiCaller.errorResponse) {
      return <Typography>{searchApiCaller.errorResponse.message}</Typography>;
    } else if (searchApiCaller.response) {
      return (
        <ItemCardCollection
          response={searchApiCaller.response.itemCard}
          callback={callback}
        />
      );
    } else {
      return <></>;
    }
  };

  const paginationComponent = (
    callback: ItemBrowsePaginationCallback
  ): JSX.Element => {
    const currentPage = searchApiCaller.response?.pageNo ?? 0;
    const totalPageNum = searchApiCaller.response?.totalPageNum ?? 0;
    return (
      <Pagination
        page={currentPage}
        count={totalPageNum}
        color="secondary"
        onChange={(_event: object, page: number) => {
          window.scrollTo(0, 0);
          callback.onPageChanged(page);
        }}
      />
    );
  };

  return {
    totalItemCountComponent,
    itemCardCollectionComponent,
    paginationComponent,
  };
};
