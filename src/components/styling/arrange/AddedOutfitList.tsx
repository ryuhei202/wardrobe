import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React from "react";
import AddedOutfitListData from "../../../model/styling/arrange/props_data/AddedOutfitListData";
import AddedOutfitListCallback from "./callback/AddedOutfitListCallback";
import { useArrangeStyle } from "./style/UseArrangeStyle";

export interface AddedOutfitListProps {
  data: AddedOutfitListData;
  callback: AddedOutfitListCallback;
}

const AddedOutfitList = (props: AddedOutfitListProps) => {
  const classes = useArrangeStyle();

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

export default AddedOutfitList;
