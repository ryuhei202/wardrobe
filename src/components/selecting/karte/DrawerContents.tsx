import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { NgMemoCollection } from "./NgMemoCollection";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { KartesContainer } from "../../karte/KartesContainer";
import { MemberContainer } from "../../member/MemberContainer";
import { LatestStylingReferenceContainer } from "../../stylingReference/LatestStylingReferenceContainer";
import { PurchasedItemsContainer } from "../../purchasedItem/PurchasedItemsContainer";

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
        <MemberContainer />
      </ListItem>
      <ListItem>
        <LatestStylingReferenceContainer />
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
        <PurchasedItemsContainer />
      </ListItem>
    </List>
  );
};
