import React from "react";
import FilterCategoryGroupData from "../../../model/styling/browse/data/FilterCategoryGroupData";
import FilterCategoryGroupCallback from "./callback/FilterCategoryGroupCallback";
import FilterCheckboxArray from "./FilterCheckboxArray";
import FilterListButtonArray from "./FilterListButtonArray";
import { useFilterCategoryGroupHandler } from "./handler/UseFilterCategoryGroupHandler";

interface FilterCategoryGroupProps {
  data: FilterCategoryGroupData;
  callback: FilterCategoryGroupCallback;
}

const FilterCategoryGroup = (props: FilterCategoryGroupProps) => {
  const handler = useFilterCategoryGroupHandler(props.callback);

  if (props.data.broaderCategoryData === null) {
    return (
      <FilterCheckboxArray
        labelIdPrefix="small-category-checkbox-list-label-"
        data={props.data.smallCategoryData}
        callback={handler.smallCategoryCallback}
      />
    );
  } else {
    return (
      <FilterListButtonArray
        data={props.data.broaderCategoryData}
        callback={handler.biggerCategoryCallback}
      />
    );
  }
};

export default FilterCategoryGroup;
