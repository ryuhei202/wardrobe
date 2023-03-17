import { Slider } from "@mui/material";
import { useState } from "react";
import { FilterFormalRankData } from "../../../model/selecting/browse/props_data/FilterFormalRankData";
import { FilterSliderCallback } from "./callback/FilterSliderCallback";

interface FilterSliderProps {
  data: number[];
  onChange: (value: number[]) => void;
}

export const FilterFormalRank = ({ data, onChange }: FilterSliderProps) => {
  return (
    <Slider
      value={data.length > 0 ? data : [1, 10]}
      color="secondary"
      valueLabelDisplay="auto"
      min={1}
      max={10}
      onChange={(_, value) => onChange(value as number[])}
    ></Slider>
  );
};
