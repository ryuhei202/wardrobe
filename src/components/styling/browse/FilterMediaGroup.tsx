import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import FilterMediaResponse from "../../../model/api/response/styling/browse/FilterMediaResponse";
import { hostUrl } from "../../../model/HostUrl";
import Filter from "../../../model/styling/browse/Filter";

interface FilterMediaGroupProps {
  labelIdPrefix: string;
  data: FilterMediaResponse[];
  selected: Filter[];
  callback: (filter: Filter) => () => void;
}

const FilterMediaGroup = (props: FilterMediaGroupProps) => {
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
            onClick={props.callback({
              id: row.id,
              name: row.name,
            })}
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
                label={
                  <img
                    src={hostUrl() + row.imagePath}
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

export default FilterMediaGroup;
