import React from "react";
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
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";
import { PurchasedItemCollection } from "./PurchasedItemCollection";
import { NgMemoCollection } from "./NgMemoCollection";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { KartesContainer } from "../../karte/KartesContainer";
interface Props {
  response: InfoResponse;
}

export const DrawerContents = (props: Props) => {
  const classes = useDrawerContentsStyle();
  // TODO: ハンドラはAPIを分けたら最終的に削除するので、名前Karteのまま
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
        <KartesContainer />
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
