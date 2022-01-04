import React from "react";
import { List, ListItem } from "@mui/material";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { KartesContainer } from "../karte/KartesContainer";
import { MemberContainer } from "../member/MemberContainer";
import { LatestStylingReferenceContainer } from "../stylingReference/LatestStylingReferenceContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";

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
      <ListItem></ListItem>
      <ListItem>
        <PurchasedItemsContainer />
      </ListItem>
    </List>
  );
};
