import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { BrowseSearchPrerequisiteResponse } from "../../../model/api/response/styling/browse/BrowseSearchPrerequisiteResponse";
import { ItemBrowseContainer } from "./ItemBrowseContainer";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface BrowseProps {
  response: BrowseSearchPrerequisiteResponse;
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

export const Browse = (props: BrowseProps) => {
  const classes = useBrowseStyle();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  return (
    <>
      <FormControl className={classes.categorySelection}>
        <InputLabel id="category-select-label">カテゴリー</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryId ?? ""}
          onChange={(event) => {
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

      {categoryId !== null && (
        <ItemBrowseContainer
          key={categoryId}
          callback={props.callback}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          categoryId={categoryId!}
          currentSelectedItemId={props.currentSelectedItemId}
        />
      )}
    </>
  );
};
