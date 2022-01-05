import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { FilterListButtonData } from "../../../model/selecting/browse/props_data/FilterListButtonData";
import { FilterListButtonArrayCallback } from "./callback/FilterListButtonArrayCallback";

interface FilterListButtonArrayProps {
  data: FilterListButtonData[];
  callback: FilterListButtonArrayCallback;
}

export const FilterListButtonArray = (props: FilterListButtonArrayProps) => {
  return (
    <List dense>
      {props.data.map((row, index) => (
        <ListItem
          key={index}
          button
          onClick={() => props.callback.onClick(index)}
        >
          <ListItemText>{row.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
