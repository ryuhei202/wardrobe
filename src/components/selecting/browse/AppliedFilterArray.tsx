import { Chip } from "@mui/material";
import React from "react";
import { AppliedFilterData } from "../../../model/selecting/browse/props_data/AppliedFilterData";
import { AppliedFiltersCallback } from "./callback/AppliedFiltersCallback";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface AppliedFilterArrayProps {
  data: AppliedFilterData[];
  callback: AppliedFiltersCallback;
}

export const AppliedFilterArray = (props: AppliedFilterArrayProps) => {
  const classes = useBrowseStyle();
  return (
    <>
      {props.data.map((filter, index) => (
        <Chip
          color="secondary"
          className={classes.appliedFilter}
          key={index}
          label={filter.name}
          onDelete={() => props.callback.onDelete(index)}
        />
      ))}
      <Chip
        color="primary"
        onClick={props.callback.onClear}
        className={classes.appliedFilter}
        label="全ての条件を解除"
      />
    </>
  );
};
