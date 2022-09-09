import { Button, List, ListItem } from "@mui/material";
import { MemberContainer } from "../member/MemberContainer";
import { PurchasedItemsContainer } from "../purchasedItem/PurchasedItemsContainer";
import { NgMemosContainer } from "../ng/NgMemoCollectionContainer";
import { MemberSizeFetcher } from "../memberSize/MemberSizeFetcher";
import { MemberMemoFetcher } from "../memberMemo/MemberMemoFetcher";
import { HostUrl } from "../../model/HostUrl";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberIdContext } from "../context/provider/ContextProvider";

type Props = {
  readonly isEditable?: boolean;
};

export const LeftDrawerContents = ({ isEditable }: Props) => {
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
      <ListItem
        sx={{ position: "sticky", top: 70, zIndex: 100 }}
        style={{ backgroundColor: "white", borderBottom: "dashed 2px black" }}
      >
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
      <MemberMemoFetcher isEditable={isEditable ?? false} />
      <NgMemosContainer />
      <PurchasedItemsContainer />
    </List>
  );
};
