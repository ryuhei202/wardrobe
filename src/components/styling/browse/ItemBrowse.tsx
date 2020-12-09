import {
  CircularProgress,
  FormControl,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGetRefinementChoiceCaller } from "../../../model/styling/browse/api_caller/UseGetRefinementChoiceCaller";
import AppliedFilters from "./AppliedFilters";
import FilterGroupCollection from "./FilterGroupCollection";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import ItemCardCollection from "./ItemCardCollection";
import { useBrowseStyle } from "./style/UseBrowseStyle";

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
              {handler.searchResult()?.totalCount ?? 0}件
            </Typography>
          </div>
          <div className={classes.appliedFilterContainer}>
            <Typography>適用済みフィルター</Typography>
            <AppliedFilters
              data={handler.currentRefinement}
              callback={handler.appliedFiltersCallback}
            />
          </div>
          <div>
            <Typography>並べ替え</Typography>
            <FormControl className={classes.sortSelection}>
              <Select native defaultValue={1} onChange={handler.onSortChanged}>
                {choiceApiCaller.response.sort.map((row) => (
                  <option value={row.id}>{row.name}</option>
                ))}
              </Select>
            </FormControl>
          </div>
        </Toolbar>
        <div className={classes.searchField}>
          <FilterGroupCollection
            data={choiceApiCaller.response.filter}
            callback={handler.filterGroupCollectionCallback}
            refinement={handler.currentRefinement}
          />
          <ItemCardCollection data={handler.searchResult()?.content ?? null} />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ItemBrowse;
