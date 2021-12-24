import { PhotoLibrary } from "@mui/icons-material";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { MemberShowResponse } from "../../../model/api/response/styling/member/MemberShowResponse";
import { ChartIdContext } from "../../App";
import { useMemberHandler } from "./handler/UseMemberHandler";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";

type Props = {
  readonly response: MemberShowResponse | undefined;
};
export const Member = (props: Props) => {
  const chartId = useContext(ChartIdContext);
  const handler = useMemberHandler(props.response);
  return (
    <>
      <ListItemText
        primary={props.response?.memberName}
        secondary={`パートナーID:${props.response?.tMemberId}, カルテID:${chartId}`}
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
    </>
  );
};
