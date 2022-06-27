import { List, ListItem } from "@mui/material";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { MemberContainer } from "../member/MemberContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";
import { NgMemosContainer } from "../ng/NgMemoCollectionContainer";
import { MemberSizeFetcher } from "../memberSize/MemberSizeFetcher";
import { MemberMemoFetcher } from "../memberMemo/MemberMemoFetcher";

export const LeftDrawerContents = () => {
  const classes = useDrawerContentsStyle();

  return (
    <List dense className={classes.leftDrawerList}>
      <ListItem>
        <MemberContainer />
      </ListItem>
      <ListItem>
        <MemberSizeFetcher />
      </ListItem>
      <ListItem>
        <NgMemosContainer />
      </ListItem>
      <ListItem>
        <PurchasedItemsContainer />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <MemberMemoFetcher />
      </ListItem>
    </List>
  );
};
