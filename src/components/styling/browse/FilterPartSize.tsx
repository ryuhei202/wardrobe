import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { FilterPartSizeData } from "../../../model/styling/browse/props_data/FilterPartSizeData";
import { FilterPartSizeCallback } from "./callback/FilterPartSizeCallback";
import { FilterSliderArray } from "./FilterSliderArray";
import { useFilterPartSizeStyle } from "./style/UseFilterPartSizeStyle";

interface FilterPartSizeProps {
  data: FilterPartSizeData;
  callback: FilterPartSizeCallback;
}

export const FilterPartSize = (props: FilterPartSizeProps) => {
  const handlePresetChange = (event: SelectChangeEvent<number | string>) => {
    props.callback.onPresetChanged(event.target.value as number);
  };
  const classes = useFilterPartSizeStyle();

  return (
    <>
      {props.data.presets.length >= 1 && (
        <FormControl className={classes.presetSelectFormControl}>
          <InputLabel id="preset-select-label">プリセット</InputLabel>
          <Select
            labelId="preset-select-label"
            value={props.data.selectedPresetIndex ?? ""}
            onChange={handlePresetChange}
            className={classes.presetSelect}
          >
            {props.data.presets.map((preset, index) => (
              <MenuItem value={index} key={index}>
                {preset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FilterSliderArray
        data={props.data.sliders}
        callback={props.callback.filterSliderArrayCallback}
      />
    </>
  );
};
