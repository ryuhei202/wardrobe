import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { KartesContainer } from "../../karte/KartesContainer";
import { MemberContainer } from "../../member/MemberContainer";
import { LatestStylingReferenceContainer } from "../../stylingReference/LatestStylingReferenceContainer";
import { PurchasedItemsContainer } from "../../purchasedItem/PurchasedItemsContainer";
import { NgMemoCollectionContainer } from "../../ngMemoCollection/NgMemoCollectionContainer";

export const DrawerContents = () => {
  const classes = useDrawerContentsStyle();

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
        <NgMemoCollectionContainer />
      </ListItem>
      <ListItem>
        <PurchasedItemsContainer />
      </ListItem>
    </List>
  );
};
