import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import FilterCheckboxData from "../../../model/styling/browse/data/FilterCheckboxData";
import FilterCheckboxArrayCallback from "./callback/FilterCheckboxArrayCallback";

interface FilterCheckboxArrayProps {
  labelIdPrefix: string;
  data: FilterCheckboxData[];
  callback: FilterCheckboxArrayCallback;
}

const FilterCheckboxArray = (props: FilterCheckboxArrayProps) => {
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
                label=""
              />
            </ListItemIcon>
            <ListItemText>{row.name}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilterCheckboxArray;
