import { List, Slider, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { FilterSliderData } from "../../../model/selecting/browse/props_data/FilterSliderData";
import { FilterSliderArrayCallback } from "./callback/FilterSliderArrayCallback";
import { useFilterSliderArrayHandler } from "./handler/useFilterSliderArrayHandler";
import { useFilterSliderArrayStyle } from "./style/UseFilterSliderArrayStyle";

interface FilterSliderArrayProps {
  data: FilterSliderData[];
  callback: FilterSliderArrayCallback;
}

export const FilterSliderArray = (props: FilterSliderArrayProps) => {
  const classes = useFilterSliderArrayStyle();
  const handler = useFilterSliderArrayHandler(props.data, props.callback);

  return (
    <List className={classes.filterSliderList}>
      {props.data.map((row, index) => {
        return (
          <Fragment key={row.key}>
            <Typography variant="body2" id={`filter-slider-${index}`}>
              {row.name}
            </Typography>
            <Slider
              value={handler.value(index)}
              color="secondary"
              aria-labelledby={`filter-slider-${index}`}
              valueLabelDisplay="auto"
              min={row.range[0]}
              max={row.range[1]}
              marks={row.range.map((endValue) => {
                return { value: endValue, label: endValue };
              })}
              onChangeCommitted={handler.onChangeCommitted(index)}
              onChange={handler.onChange(index)}
            ></Slider>
          </Fragment>
        );
      })}
    </List>
  );
};
