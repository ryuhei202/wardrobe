import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import FilterCheckboxData from "../../../model/styling/browse/props_data/FilterCheckboxData";
import FilterCheckboxArrayCallback from "./callback/FilterCheckboxArrayCallback";

interface FilterCheckboxArrayProps {
  labelIdPrefix: string;
  data: FilterCheckboxData[];
  callback: FilterCheckboxArrayCallback;
}

const FilterCheckboxArray = (props: FilterCheckboxArrayProps) => {
  let backButton;
  if (props.callback.onClickBackButton !== undefined) {
    backButton = (
      <IconButton
        onClick={() => {
          props.callback.onClickBackButton!!();
        }}
      >
        <ArrowBack />
      </IconButton>
    );
  }

  return (
    <>
      {backButton}
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
                <Checkbox
                  edge="start"
                  checked={row.isSelected}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText>{row.name}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default FilterCheckboxArray;
