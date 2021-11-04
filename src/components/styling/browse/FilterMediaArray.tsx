import { Checkbox, List, ListItem, ListItemIcon } from "@mui/material";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import FilterMediaData from "../../../model/styling/browse/props_data/FilterMediaData";
import FilterMediaArrayCallback from "./callback/FilterMediaArrayCallback";

interface FilterMediaArrayProps {
  labelIdPrefix: string;
  data: FilterMediaData[];
  callback: FilterMediaArrayCallback;
}

const FilterMediaArray = (props: FilterMediaArrayProps) => {
  return (
    <List dense>
      {props.data.map((row, index) => {
        const labelId = props.labelIdPrefix + index;
        return (
          <ListItem
            key={index}
            role={undefined}
            button
            onClick={() => {
              props.callback.onClick(index);
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={row.isSelected}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <img
              src={HostUrl() + row.imagePath}
              width="40px"
              height="auto"
              alt=""
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilterMediaArray;
