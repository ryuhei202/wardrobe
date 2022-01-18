import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import React from "react";
import { AddedOutfitListData } from "../../../model/selecting/arrange/props_data/AddedOutfitListData";
import { AddedOutfitListCallback } from "./callback/AddedOutfitListCallback";
import { useAddedOutfitListStyle } from "./style/UseAddedOutfitListStyle";

export interface AddedOutfitListProps {
  data: AddedOutfitListData;
  callback: AddedOutfitListCallback;
}

export const AddedOutfitList = (props: AddedOutfitListProps) => {
  const classes = useAddedOutfitListStyle();

  return (
    <Paper className={classes.registeredAdviceListContainer}>
      <List
        dense={true}
        subheader={<ListSubheader>追加済みアドバイス</ListSubheader>}
      >
        {props.data.outfitList.map((outfit, index) => (
          <ListItem key={index} selected={props.data.editingOutfit === index}>
            <ListItemText
              primary={outfit.items
                .map((item) => `${item.id}: ${item.categoryName}`)
                .join(", ")}
              secondary={outfit.advices.join("・")}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => props.callback.onClickEdit(index)}
                size="large"
              >
                <Edit />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem
          button
          selected={props.data.editingOutfit === props.data.outfitList.length}
          onClick={() => props.callback.onClickNew()}
        >
          <ListItemText>新規追加</ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
};