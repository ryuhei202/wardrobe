import { Slider } from "@mui/material";
import { useState } from "react";
import { FilterFormalRankData } from "../../../model/selecting/browse/props_data/FilterFormalRankData";
import { FilterSliderCallback } from "./callback/FilterSliderCallback";

interface FilterSliderProps {
  data: number[];
  onChange: (value: number[]) => void;
}

export const FilterFormalRank = ({ data, onChange }: FilterSliderProps) => {
  const [currentValue, setCurrentValue] = useState([1, 10]);

  const onSlided = (value: number | number[]) => {
    setCurrentValue(value as number[]);
  };
  const onSliderMouseUp = (value: number | number[]) => {
    onChange(value as number[]);
  };

  return (
    <Slider
      value={data.length > 0 ? currentValue : [1, 10]}
      color="secondary"
      valueLabelDisplay="auto"
      min={1}
      max={10}
      onChange={(_, value) => onSlided(value)}
      onChangeCommitted={(_, value) => onSliderMouseUp(value)}
    ></Slider>
  );
};
