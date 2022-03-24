import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
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
          <ListItem
            button
            key={index}
            selected={props.data.editingOutfit === index}
            onClick={() => props.callback.onClickEdit(index)}
          >
            <ListItemText
              primary={
                <>
                  {outfit.items.map((item) => (
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      style={{ marginBottom: 2 }}
                    >
                      <Avatar variant="rounded" src={item.imagePath} />
                      {item.id}: {item.categoryName}
                      <br />
                    </Grid>
                  ))}
                </>
              }
              secondary={
                <>
                  {outfit.advices.map((advice) => (
                    <>
                      {advice}
                      <br />
                    </>
                  ))}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => {
                  if (window.confirm("本当にアドバイスを削除しますか？")) {
                    props.callback.onClickDelete(index);
                  }
                }}
                size="small"
              >
                <Delete />
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
