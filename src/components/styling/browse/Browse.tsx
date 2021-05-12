import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import SearchPrerequisiteResponse from "../../../model/api/response/styling/browse/SearchPrerequisiteResponse";
import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import ItemBrowseContainer from "./ItemBrowseContainer";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface BrowseProps {
  response: SearchPrerequisiteResponse;
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

const Browse = (props: BrowseProps) => {
  const classes = useBrowseStyle();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [silhouetteId, setSilhouetteId] = useState<number | null>(null);

  let itemBrowse;
  if (categoryId) {
    itemBrowse = (
      <ItemBrowseContainer
        callback={props.callback}
        categoryId={categoryId!!}
        silhouetteId={silhouetteId}
        currentSelectedItemId={props.currentSelectedItemId}
      />
    );
  }

  return (
    <>
      <FormControl className={classes.categorySelection}>
        <InputLabel id="category-select-label">カテゴリー</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryId}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setCategoryId(event.target.value as number);
          }}
        >
          {props.response.category.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.categorySelection}>
        <InputLabel id="silhouette-select-label">シルエット</InputLabel>
        <Select
          labelId="silhouette-select-label"
          id="silhouette-select"
          value={silhouetteId}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setSilhouetteId(event.target.value as number);
          }}
        >
          {props.response.silhouette.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {itemBrowse}
    </>
  );
};

export default Browse;
