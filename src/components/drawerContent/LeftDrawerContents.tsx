import { Button, List, ListItem } from "@mui/material";
import { MemberContainer } from "../member/MemberContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";
import { NgMemosContainer } from "../ng/NgMemoCollectionContainer";
import { MemberSizeFetcher } from "../memberSize/MemberSizeFetcher";
import { MemberMemoFetcher } from "../memberMemo/MemberMemoFetcher";
import { HostUrl } from "../../model/HostUrl";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberIdContext } from "../context/provider/ContextProvider";

export const LeftDrawerContents = () => {
  const memberPhotoSUPath = `${HostUrl()}/igoue_admin/members/${useContextDefinedState(
    MemberIdContext
  )}/member_photos`;

  return (
    <List
      dense
      style={{
        maxWidth: 360,
      }}
    >
      <ListItem>
        <MemberContainer />
      </ListItem>
      <ListItem>
        <Button
          href={memberPhotoSUPath}
          target="_blank"
          variant="contained"
          color="secondary"
        >
          会員写真登録
        </Button>
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
