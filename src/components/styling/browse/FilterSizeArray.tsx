import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import FilterSizeData from "../../../model/styling/browse/props_data/FilterSizeData";
import FilterSizeArrayCallback from "./callback/FilterSizeArrayCallback";

interface FilterSizeArrayProps {
  data: FilterSizeData[];
  callback: FilterSizeArrayCallback;
}

const FilterSizeArray = (props: FilterSizeArrayProps) => {
  return (
    <ButtonGroup
      orientation="vertical"
      color="secondary"
      disableElevation
      aria-label="button group"
    >
      {props.data.map((row, index) => (
        <Button
          variant={row.isSelected ? "contained" : "outlined"}
          onClick={() => props.callback.onClick(index)}
          key={index}
        >
          {row.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterSizeArray;
