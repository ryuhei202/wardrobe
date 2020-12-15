import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import FilterSizeData from "../../../model/styling/browse/data/FilterSizeData";
import FilterSizeArrayCallback from "./callback/FilterSizeArrayCallback";

interface FilterSizeArrayProps {
  data: FilterSizeData[];
  callback: FilterSizeArrayCallback;
}

const FilterSizeArray = (props: FilterSizeArrayProps) => {
  return (
    <ButtonGroup
      color="secondary"
      disableElevation
      aria-label="outlined button group"
    >
      {props.data.map((row, index) => {
        if (row.isSelected) {
          return (
            <Button
              variant="contained"
              onClick={() => props.callback.onClick(index)}
            >
              {row.name}
            </Button>
          );
        } else {
          return (
            <Button onClick={() => props.callback.onClick(index)}>
              {row.name}
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
};

export default FilterSizeArray;
