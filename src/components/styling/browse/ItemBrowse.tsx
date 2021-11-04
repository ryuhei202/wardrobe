import {
  CircularProgress,
  FormControl,
  Pagination,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import { FilterGroupCollection } from "./FilterGroupCollection";
import { AppliedFilterArray } from "./AppliedFilterArray";
import { RefinementChoiceResponse } from "../../../model/api/response/styling/browse/RefinementChoiceResponse";
import { BrowseDetailContainer } from "./BrowseDetailContainer";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";
import { useItemBrowseStyle } from "./style/UseItemBrowseStyle";
import { useGetIndexCaller } from "../../../model/styling/browse/api_caller/UseGetIndexCaller";
import { ItemCardCollection } from "./ItemCardCollection";

export interface ItemBrowseProps {
  response: RefinementChoiceResponse;
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

export const ItemBrowse = (props: ItemBrowseProps) => {
  const classes = useItemBrowseStyle();
  const handler = useItemBrowseHandler(props.response, props.callback);
  const searchApiCaller = useGetIndexCaller(handler.currentRefinement);

  if (handler.selectedPreregisteredItemId) {
    return (
      <BrowseDetailContainer
        id={handler.selectedPreregisteredItemId}
        refinement={handler.currentRefinement}
        callback={handler.browseDetailCallback()}
        currentSelectedItemId={props.currentSelectedItemId}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" noWrap>
        アイテム一覧
      </Typography>
      <Toolbar className={classes.itemBrowseHeader}>
        <div className={classes.searchResult}>
          <Typography paragraph={true}>
            検索結果
            <br />
            {searchApiCaller.response?.totalCount ?? 0}件
          </Typography>
        </div>
        <div className={classes.appliedFilterContainer}>
          <Typography>適用済みフィルター</Typography>
          <AppliedFilterArray
            data={handler.appliedFilterArrayData()}
            callback={handler.appliedFiltersCallback()}
          />
        </div>
        <div>
          <Typography>並べ替え</Typography>
          <FormControl className={classes.sortSelection}>
            <Select
              native
              value={handler.selectedSortIndex()}
              onChange={handler.onSortChanged()}
            >
              {handler.sortSelection().map((row, index) => (
                <option value={index} key={index}>
                  {row}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
      <div className={classes.searchField}>
        <FilterGroupCollection
          data={handler.filterGroupCollectionData()}
          callback={handler.filterGroupCollectionCallback()}
        />
        {() => {
          if (searchApiCaller.isRunning()) {
            return <CircularProgress />;
          } else if (searchApiCaller.errorResponse) {
            return (
              <Typography>{searchApiCaller.errorResponse.message}</Typography>
            );
          } else if (searchApiCaller.response) {
            return (
              <ItemCardCollection
                response={searchApiCaller.response.itemCard}
                callback={handler.itemCardCollectionCallback()}
              />
            );
          } else {
            return <></>;
          }
        }}
      </div>
      <div className={classes.paginationContainer}>
        {
          <Pagination
            page={searchApiCaller.response?.pageNo ?? 0}
            count={searchApiCaller.response?.totalPageNum ?? 0}
            color="secondary"
            onChange={(_event: object, page: number) => {
              window.scrollTo(0, 0);
              handler.paginationCallback().onPageChanged(page);
            }}
          />
        }
      </div>
    </>
  );
};
