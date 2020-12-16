import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import FilterListButtonData from "../../../model/styling/browse/data/FilterListButtonData";
import FilterListButtonArrayCallback from "./callback/FilterListButtonArrayCallback";

interface FilterListButtonArrayProps {
  data: FilterListButtonData[];
  callback: FilterListButtonArrayCallback;
}

const FilterListButtonArray = (props: FilterListButtonArrayProps) => {
  return (
    <List>
      {props.data.map((row, index) => (
        <ListItem button onClick={() => props.callback.onClick(index)}>
          <ListItemText>{row.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default FilterListButtonArray;
