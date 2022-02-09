import React from "react";
import { List, ListItem } from "@mui/material";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { KarteSectionContainer } from "../karte/KarteSectionContainer";
import { LatestStylingReferenceContainer } from "../stylingReference/LatestStylingReferenceContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";
import { NgMemosContainer } from "../ng/NgMemoCollectionContainer";
import { Member } from "../member/Member";
import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";

type Props = {
  readonly memberShowResponse: MemberShowResponse;
};

export const DrawerContents = (props: Props) => {
  const classes = useDrawerContentsStyle();

  return (
    <List dense className={classes.drawerList}>
      <ListItem>
        <Member response={props.memberShowResponse} />
      </ListItem>
      <ListItem>
        <LatestStylingReferenceContainer />
      </ListItem>
      <ListItem>
        <KarteSectionContainer />
      </ListItem>
      <ListItem>
        <NgMemosContainer />
      </ListItem>
      <ListItem>
        <PurchasedItemsContainer />
      </ListItem>
    </List>
  );
};
