import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { ListAlt, PhotoLibrary } from "@mui/icons-material";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { PastOutfitCollectionDialog } from "./PastOutfitCollectionDialog";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";
import { PastOutfitCollection } from "./PastOutfitCollection";
import { PurchasedItemCollection } from "./PurchasedItemCollection";
import { NgMemoCollection } from "./NgMemoCollection";

interface KarteProps {
  response: InfoResponse;
}

export const Karte = (props: KarteProps) => {
  const classes = useKarteStyle();
  const handler = useKarteHandler(props.response);

  return (
    <List dense className={classes.drawerList}>
      <ListItem>
        <ListItemText
          primary={props.response.memberName}
          secondary={`パートナーID:${props.response.tMemberId}, カルテID:${props.response.tChartId}`}
        />
        <ListItemSecondaryAction>
          <IconButton
            color="primary"
            onClick={handler.setMemberImageDialogOpen}
            size="large"
          >
            <PhotoLibrary />
          </IconButton>
          <MemberImageCollectionDialog
            data={handler.memberImageDialogData()}
            callback={handler.memberImageDialogCallback()}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText>
          過去のコーデ：
          <IconButton
            color="primary"
            onClick={handler.setPastOutfitDialogOpen}
            size="large"
          >
            <ListAlt />
          </IconButton>
          <PastOutfitCollectionDialog
            data={handler.pastOutfitDialogData()}
            callback={handler.pastOutfitDialogCallback()}
          />
          <PastOutfitCollection data={handler.pastOutfitCollectionData()} />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          NGメモ：
          <NgMemoCollection data={handler.ngMemoCollectionData()} />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          購入済アイテム：
          <PurchasedItemCollection
            data={handler.purchasedItemCollectionData()}
          />
        </ListItemText>
      </ListItem>
    </List>
  );
};
