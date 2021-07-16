import { FormControl, Select } from "@material-ui/core";
import React from "react";
import { FilterPartSizeData } from "../../../model/styling/browse/props_data/FilterPartSizeData";
import { FilterPartSizeCallback } from "./callback/FilterPartSizeCallback";
import { FilterSliderArray } from "./FilterSliderArray";

interface FilterPartSizeProps {
  data: FilterPartSizeData;
  callback: FilterPartSizeCallback;
}

export const FilterPartSize = (props: FilterPartSizeProps) => {
  const handlePresetChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.callback.onPresetChanged(event.target.value as number);
  };

  return (
    <>
      <FormControl>
        <Select
          native
          value={props.data.selectedPresetIndex}
          onChange={handlePresetChange}
        >
          {props.data.presets.map((preset, index) => (
            <option value={index} key={index}>
              {preset}
            </option>
          ))}
        </Select>
      </FormControl>
      <FilterSliderArray
        data={props.data.sliders}
        callback={props.callback.filterSliderArrayCallback}
      />
    </>
  );
};
