import React from "react";
import FilterCategoryGroupData from "../../../model/styling/browse/data/FilterCategoryGroupData";
import FilterCategoryGroupCallback from "./callback/FilterCategoryGroupCallback";
import FilterCheckboxArray from "./FilterCheckboxArray";
import FilterListButtonArray from "./FilterListButtonArray";

interface FilterCategoryGroupProps {
  data: FilterCategoryGroupData;
  callback: FilterCategoryGroupCallback;
}

const FilterCategoryGroup = (props: FilterCategoryGroupProps) => {
  if (props.data.broaderCategoryData === null) {
    return (
      <FilterCheckboxArray
        labelIdPrefix="small-category-checkbox-list-label-"
        data={props.data.smallCategoryData}
        callback={props.callback.smallerCategoryCallback}
      />
    );
  } else {
    return (
      <FilterListButtonArray
        data={props.data.broaderCategoryData}
        callback={props.callback.broaderCategoryCallback}
      />
    );
  }
};

export default FilterCategoryGroup;
