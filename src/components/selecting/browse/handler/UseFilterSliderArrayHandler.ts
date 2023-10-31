import { useEffect, useState } from "react";
import { FilterSliderData } from "../../../../model/selecting/browse/props_data/FilterSliderData";
import { FilterSliderArrayCallback } from "../callback/FilterSliderArrayCallback";

export interface FilterSliderArrayHandler {
  value: (index: number) => number[];
  onChangeCommitted: (index: number) => (event: object, value: number | number[]) => void;
  onChange: (index: number) => (event: object, value: number | number[]) => void;
}

export const useFilterSliderArrayHandler = (
  data: FilterSliderData[],
  callback: FilterSliderArrayCallback,
): FilterSliderArrayHandler => {
  const [currentValues, setCurrentValues] = useState(data.map((row) => row.selectedValue));

  useEffect(() => {
    setCurrentValues(data.map((row) => row.selectedValue));
  }, [data]);

  const value = (index: number) => currentValues[index];

  const onChangeCommitted = (index: number) => (event: object, value: number | number[]) => {
    callback.onChange(index, value as number[]);
  };

  const onChange = (index: number) => (event: object, value: number | number[]) => {
    const newValues = [...currentValues];
    newValues[index] = value as number[];
    setCurrentValues(newValues);
  };

  return { value, onChangeCommitted, onChange };
};
