import { List, ListItem } from "@mui/material";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { MemberContainer } from "../member/MemberContainer";
import { LatestStylingReferenceContainer } from "../stylingReference/LatestStylingReferenceContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";
import { NgMemosContainer } from "../ng/NgMemoCollectionContainer";
import { KarteSection } from "../karte/KarteSection";

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
        <KarteSection />
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
