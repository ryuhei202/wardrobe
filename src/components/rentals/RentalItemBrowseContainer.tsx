import {
  FormControl,
  Pagination,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TRentalFiltersResponse } from "../../hooks/api/UseRentalFilters";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { useItemBrowseStyle } from "../selecting/browse/style/UseItemBrowseStyle";
import { RentalAppliedFilterArray } from "./RentalAppliedFilterArray";
import { RentalFilterGroupCollection } from "./RentalFilterGroupCollection";
import { RentalItemBrowse } from "./RentalItemBrowse";
import { getFilterGroupCollectionHandler } from "./handler/getFilterGroupCollectionHandler";
import { getFilterListHandler } from "./handler/getFilterListHandler";

type TProps = {
  filter: TRentalFiltersResponse;
  currentRefinement: Refinement;
  categoryId: number;
  onClickItemCard: (id: number) => void;
  onChangeCurrentRefinement: (refinement: Refinement) => void;
};
export const RentalItemBrowseContainer = ({
  filter,
  categoryId,
  onClickItemCard,
  currentRefinement,
  onChangeCurrentRefinement,
}: TProps) => {
  const classes = useItemBrowseStyle();

  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const { appliedFilterArrayData, handleClickDelete, handleClickClear } =
    getFilterListHandler({
      filter: filter.filter,
      currentRefinement,
      defaultRefinement: filter.defaultRefinement,
      sort: filter.sort,
      categoryId,
      onChangeCurrentRefinement,
    });

  const { filterCollection, filterCollectionCallback } =
    getFilterGroupCollectionHandler({
      filter: filter.filter,
      currentRefinement,
      onChangeCurrentRefinement,
    });

  const onPageChanged = (page: number) => {
    onChangeCurrentRefinement({
      ...currentRefinement,
      pageNo: page,
    });
  };

  return (
    <>
      <Typography variant="h6" noWrap>
        アイテム一覧
      </Typography>
      <Toolbar className={classes.itemBrowseHeader}>
        <div className={classes.searchResult}>
          <Typography paragraph>
            検索結果
            <br />
            {totalCount}件
          </Typography>
        </div>
        <div className={classes.appliedFilterContainer}>
          <Typography>適用済みフィルター</Typography>
          <RentalAppliedFilterArray
            data={appliedFilterArrayData()}
            onDelete={handleClickDelete}
            onClear={handleClickClear}
          />
        </div>
        <div>
          <Typography>並べ替え</Typography>
          <FormControl className={classes.sortSelection}>
            <Select
              native
              value={
                filter.sort.findIndex(
                  (sort) => sort.id === currentRefinement.sortId,
                ) ?? 0
              }
              onChange={(e) => {
                const index = parseInt(e.target.value as string);
                const newRefinement = {
                  ...currentRefinement,
                  sortId: filter.sort[index].id,
                  pageNo: 1,
                };
                onChangeCurrentRefinement(newRefinement);
              }}
            >
              {filter.sort
                .map((s) => s.name)
                .map((row, index) => (
                  <option value={index} key={index}>
                    {row}
                  </option>
                ))}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
      <div className={classes.searchField}>
        <RentalFilterGroupCollection
          filterCollection={filterCollection}
          callback={filterCollectionCallback}
        />
        <RentalItemBrowse
          currentRefinement={currentRefinement}
          onChangeTotalCount={(totalCount) => setTotalCount(totalCount)}
          onChangeTotalPageNum={(totalPageNum) => setTotalPageNum(totalPageNum)}
          onClickItemCard={onClickItemCard}
        />
      </div>
      <div className={classes.paginationContainer}>
        <Pagination
          page={currentRefinement.pageNo}
          count={totalPageNum}
          color="secondary"
          onChange={(_event: object, page: number) => {
            window.scrollTo(0, 0);
            onPageChanged(page);
          }}
        />
      </div>
    </>
  );
};
