import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import FilterResponse from "../../../model/api/response/styling/browse/FilterResponse";
import LargeCategoryChoiceResponse from "../../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import Refinement from "../../../model/styling/browse/Refinement";
import FilterCategoryGroupCallback from "./callback/FilterCategoryGroupCallback";
import FilterCheckboxGroup from "./FilterCheckboxGroup";

interface FilterCategoryGroupProps {
  data: LargeCategoryChoiceResponse[];
  selected: Refinement;
  callback: FilterCategoryGroupCallback;
}

const FilterCategoryGroup = (props: FilterCategoryGroupProps) => {
  if (props.selected.mediumCategory !== null) {
    const selectedMediumCategory = props.data
      .flatMap((largeCategory) => largeCategory.mediumCategory)
      .find(
        (mediumCategory) =>
          mediumCategory.id === props.selected.mediumCategory?.id
      );
    const smallCategory: FilterResponse[] =
      selectedMediumCategory?.smallCategory ?? [];
    return (
      <FilterCheckboxGroup
        labelIdPrefix="small-category-checkbox-list-label-"
        data={smallCategory}
        selected={props.selected.smallCategories}
        callback={props.callback.onSmallCategoryChanged}
      />
    );
  } else if (props.selected.largeCategory !== null) {
    const selectedLargeCategory = props.data.find(
      (largeCategory) => largeCategory.id === props.selected.largeCategory?.id
    );
    return (
      <List>
        {selectedLargeCategory?.mediumCategory.map((row) => (
          <ListItem
            button
            onClick={props.callback.onMediumCategoryChanged({
              id: row.id,
              name: row.name,
            })}
          >
            <ListItemText>{row.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return (
      <List>
        {props.data.map((row) => (
          <ListItem
            button
            onClick={props.callback.onLargeCategoryChanged({
              id: row.id,
              name: row.name,
            })}
          >
            <ListItemText>{row.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
};

export default FilterCategoryGroup;
