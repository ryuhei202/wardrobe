import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { FilterCheckboxData } from "../../../model/selecting/browse/props_data/FilterCheckboxData";
import { FilterCheckboxArrayCallback } from "./callback/FilterCheckboxArrayCallback";

interface FilterCheckboxArrayProps {
  labelIdPrefix: string;
  data: FilterCheckboxData[];
  callback: FilterCheckboxArrayCallback;
}

export const FilterCheckboxArray = (props: FilterCheckboxArrayProps) => {
  let backButton;
  if (props.callback.onClickBackButton !== undefined) {
    backButton = (
      <IconButton
        onClick={() => {
          props.callback.onClickBackButton!!();
        }}
        size="large"
      >
        <ArrowBack />
      </IconButton>
    );
  }

  return (
    <>
      {backButton}
      <List dense>
        {props.data.map((row, index) => {
          const labelId = props.labelIdPrefix + index;
          return (
            <ListItem
              key={index}
              role={undefined}
              button
              onClick={() => props.callback.onClick(index)}
            >
              <ListItemIcon style={{ minWidth: "unset" }}>
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
