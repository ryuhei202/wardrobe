import { Slider } from "@mui/material";
import { useState } from "react";
import { FormalRankRefinement } from "../../../model/selecting/browse/FormalRankRefinement";

interface FilterSliderProps {
  data: FormalRankRefinement;
  onChange: (value: FormalRankRefinement) => void;
}

export const FilterFormalRank = ({ data, onChange }: FilterSliderProps) => {
  const [currentValue, setCurrentValue] = useState([1, 10]);

  const onSlided = (value: number | number[]) => {
    setCurrentValue(value as number[]);
  };
  const onSliderMouseUp = (value: number | number[]) => {
    if (typeof value == "object") {
      onChange({ min: value[0], max: value[1] });
    }
  };

  return (
    <Slider
      value={currentValue}
      color="secondary"
      valueLabelDisplay="auto"
      min={1}
      max={10}
      onChange={(_, value) => onSlided(value)}
      onChangeCommitted={(_, value) => onSliderMouseUp(value)}
    ></Slider>
  );
};
