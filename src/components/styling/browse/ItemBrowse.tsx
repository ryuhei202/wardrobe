import {
  CircularProgress,
  FormControl,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGetRefinementChoiceCaller } from "../../../model/styling/browse/api_caller/UseGetRefinementChoiceCaller";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import ItemCardCollection from "./ItemCardArray";
import { useBrowseStyle } from "./style/UseBrowseStyle";
import Pagination from "@material-ui/lab/Pagination";
import FilterGroupCollection from "./FilterGroupCollection";
import AppliedFilterArray from "./AppliedFilterArray";

const ItemBrowse = () => {
  const classes = useBrowseStyle();

  const choiceApiCaller = useGetRefinementChoiceCaller();
  const handler = useItemBrowseHandler();

  if (choiceApiCaller.isRunning()) {
    return <CircularProgress />;
  } else if (choiceApiCaller.errorResponse !== null) {
    return <Typography>{choiceApiCaller.errorResponse.message}</Typography>;
  } else if (choiceApiCaller.response !== null) {
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
              {handler.totalItemCount()}件
            </Typography>
          </div>
          <div className={classes.appliedFilterContainer}>
            <Typography>適用済みフィルター</Typography>
            <AppliedFilterArray
              data={handler.appliedFilterArrayData(
                choiceApiCaller.response.filter
              )}
              callback={handler.appliedFiltersCallback()}
            />
          </div>
          <div>
            <Typography>並べ替え</Typography>
            <FormControl className={classes.sortSelection}>
              <Select
                native
                defaultValue={1}
                onChange={handler.onSortChanged(choiceApiCaller.response.sort)}
              >
                {handler
                  .sortSelection(choiceApiCaller.response.sort)
                  .map((row, index) => (
                    <option value={index}>{row}</option>
                  ))}
              </Select>
            </FormControl>
          </div>
        </Toolbar>
        <div className={classes.searchField}>
          <FilterGroupCollection
            data={handler.filterGroupCollectionData(
              choiceApiCaller.response.filter
            )}
            callback={handler.filterGroupCollectionCallback(
              choiceApiCaller.response.filter
            )}
          />
          <ItemCardCollection data={handler.itemCardData()} />
        </div>
        <div className={classes.paginationContainer}>
          <Pagination
            page={handler.currentPage()}
            count={handler.totalPageNum()}
            color="secondary"
            onChange={handler.onPageChanged}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ItemBrowse;
