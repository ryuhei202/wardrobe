import { List, ListItem, Slider, Typography } from "@material-ui/core";
import React from "react";
import FilterSliderData from "../../../model/styling/browse/props_data/FilterSliderData";
import FilterSliderArrayCallback from "./callback/FilterSliderArrayCallback";

interface FilterSliderArrayProps {
  data: FilterSliderData[];
  callback: FilterSliderArrayCallback;
}

const FilterSliderArray = (props: FilterSliderArrayProps) => {
  return (
    <List>
      {props.data.map((row, index) => {
        return (
          <ListItem key={index} role={undefined} dense>
            <Typography id={`filter-slider-${index}`} gutterBottom>
              {row.name}
            </Typography>
            <Slider
              marks
              color="secondary"
              aria-labelledby={`filter-slider-${index}`}
              valueLabelDisplay="auto"
              min={row.range[0]}
              max={row.range[1]}
              onChangeCommitted={(event: object, value: number | number[]) => {
                props.callback.onChange(index, value as number);
              }}
            ></Slider>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilterSliderArray;
