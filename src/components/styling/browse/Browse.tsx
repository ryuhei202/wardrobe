import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import CategoryChoiceResponse from "../../../model/api/response/styling/browse/CategoryChoiceResponse";
import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import ItemBrowseContainer from "./ItemBrowseContainer";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface BrowseProps {
  response: CategoryChoiceResponse[];
  callback: ItemBrowseCallback;
}

const Browse = (props: BrowseProps) => {
  const classes = useBrowseStyle();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  let itemBrowse;
  if (categoryId) {
    itemBrowse = (
      <ItemBrowseContainer
        callback={props.callback}
        categoryId={categoryId!!}
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
          {props.response.map((option, index) => (
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
