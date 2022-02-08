import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Refinement } from "../../../../model/selecting/browse/Refinement";
import { ItemCardCollection } from "../ItemCardCollection";
import { Pagination } from "@mui/material";
import { ItemCardCollectionCallback } from "../callback/ItemCardCollectionCallback";
import { ItemBrowsePaginationCallback } from "../callback/ItemBrowsePaginationCallback";
import { useBrowsesIndex } from "../../../../hooks/api/UseBrowsesIndex";

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
  const { data, error, refetch, isFetching } = useBrowsesIndex(refinement);

  useEffect(() => {
    refetch();
  }, [refetch, refinement]);

  const totalItemCountComponent = (): JSX.Element => {
    const totalCount = data?.totalCount ?? 0;
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
    if (!data || isFetching) {
      return <CircularProgress />;
    } else if (error) {
      return <Typography>{error.message}</Typography>;
    } else if (data) {
      return (
        <ItemCardCollection response={data.itemCard} callback={callback} />
      );
    } else {
      return <></>;
    }
  };

  const paginationComponent = (
    callback: ItemBrowsePaginationCallback
  ): JSX.Element => {
    const currentPage = data?.pageNo ?? 0;
    const totalPageNum = data?.totalPageNum ?? 0;
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
