import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ListAlt, PhotoLibrary } from "@material-ui/icons";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { useKartePresenter } from "./presenter/UseKartePresenter";
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
  const presenter = useKartePresenter(props.response);

  return (
    <List dense className={classes.drawerList}>
      <ListItem>
        <ListItemText
          primary={presenter.memberInfoPrimaryText()}
          secondary={presenter.memberInfoSecondaryText()}
        />
        <ListItemSecondaryAction>
          <IconButton
            color="primary"
            onClick={handler.setMemberImageDialogOpen}
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
          <IconButton color="primary" onClick={handler.setPastOutfitDialogOpen}>
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
