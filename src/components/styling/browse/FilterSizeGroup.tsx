import { Button, ButtonGroup } from "@material-ui/core";

import React from "react";
import FilterResponse from "../../../model/api/response/styling/browse/FilterResponse";

import Filter from "../../../model/styling/browse/Filter";

interface FilterSizeGroupProps {
  data: FilterResponse[];
  selected: Filter[];
  callback: (filter: Filter) => () => void;
}

const FilterSizeGroup = (props: FilterSizeGroupProps) => {
  return (
    <ButtonGroup
      color="secondary"
      disableElevation
      aria-label="outlined button group"
    >
      {props.data.map((row) => {
        if (props.selected.findIndex((item) => item.id === row.id) !== -1) {
          return (
            <Button
              variant="contained"
              onClick={props.callback({ id: row.id, name: row.name })}
            >
              {row.name}
            </Button>
          );
        } else {
          return (
            <Button onClick={props.callback({ id: row.id, name: row.name })}>
              {row.name}
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
};

export default FilterSizeGroup;
