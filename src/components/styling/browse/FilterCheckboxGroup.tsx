import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import FilterResponse from "../../../model/api/response/styling/browse/FilterResponse";
import Filter from "../../../model/styling/browse/Filter";

interface FilterCheckboxGroupProps {
  labelIdPrefix: string;
  data: FilterResponse[];
  selected: Filter[];
  callback: (filter: Filter) => () => void;
}

const FilterCheckboxGroup = (props: FilterCheckboxGroupProps) => {
  return (
    <List>
      {props.data.map((row) => {
        const labelId = props.labelIdPrefix + row.id;
        return (
          <ListItem
            key={row.id}
            role={undefined}
            dense
            button
            onClick={props.callback({ id: row.id, name: row.name })}
          >
            <ListItemIcon>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      props.selected.findIndex((item) => item.id === row.id) !==
                      -1
                    }
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

export default FilterCheckboxGroup;
