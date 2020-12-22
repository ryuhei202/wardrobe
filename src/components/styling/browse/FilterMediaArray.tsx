import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
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
    <List>
      {props.data.map((row, index) => {
        const labelId = props.labelIdPrefix + index;
        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={() => props.callback.onClick(index)}
          >
            <ListItemIcon>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={row.isSelected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                label={
                  <img
                    src={HostUrl() + row.imagePath}
                    width="40px"
                    height="auto"
                    alt=""
                  />
                }
              />
            </ListItemIcon>
            <ListItemText>{row.name}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilterMediaArray;
