import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { FilterPartSizeData } from "../../../model/styling/browse/props_data/FilterPartSizeData";
import { FilterPartSizeCallback } from "./callback/FilterPartSizeCallback";
import { FilterSliderArray } from "./FilterSliderArray";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface FilterPartSizeProps {
  data: FilterPartSizeData;
  callback: FilterPartSizeCallback;
}

export const FilterPartSize = (props: FilterPartSizeProps) => {
  const handlePresetChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.callback.onPresetChanged(event.target.value as number);
  };
  const classes = useBrowseStyle();

  return (
    <>
      {props.data.presets.length >= 1 && (
        <FormControl className={classes.presetSelector}>
          <InputLabel id="preset-select-label">プリセット</InputLabel>
          <Select
            labelId="preset-select-label"
            value={props.data.selectedPresetIndex ?? ""}
            onChange={handlePresetChange}
            className={classes.presetSelector}
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
