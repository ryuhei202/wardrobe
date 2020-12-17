import { FormControl, Select, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useBrowseIndexHandler } from "./handler/UseBrowseIndexHandler";
import { useBrowseStyle } from "./style/UseBrowseStyle";
import FilterGroupCollection from "./FilterGroupCollection";
import AppliedFilterArray from "./AppliedFilterArray";
import RefinementChoiceResponse from "../../../model/api/response/styling/browse/RefinementChoiceResponse";
import { useBrowseIndexProvider } from "./provider/UseBrowseIndexProvider";
import BrowseIndexCallback from "./callback/BrowseIndexCallback";

export interface BrowseIndexProps {
  response: RefinementChoiceResponse;
  callback: BrowseIndexCallback;
}

const BrowseIndex = (props: BrowseIndexProps) => {
  const classes = useBrowseStyle();

  const handler = useBrowseIndexHandler(props.response);
  const provider = useBrowseIndexProvider(handler.currentRefinement);

  return (
    <>
      <Typography variant="h6" noWrap>
        アイテム一覧
      </Typography>
      <Toolbar className={classes.itemBrowseHeader}>
        <div className={classes.searchResult}>
          {provider.totalItemCountComponent()}
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
            <Select native defaultValue={1} onChange={handler.onSortChanged()}>
              {handler.sortSelection().map((row, index) => (
                <option value={index}>{row}</option>
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
        {provider.itemCardCollectionComponent(
          props.callback.itemCardCollectionCallback
        )}
      </div>
      <div className={classes.paginationContainer}>
        {provider.paginationComponent(handler.paginationCallback())}
      </div>
    </>
  );
};

export default BrowseIndex;
