import { PhotoLibrary } from "@mui/icons-material";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { ChartIdContext } from "../provider/ContextProvider";
import { useMemberHandler } from "./handler/UseMemberHandler";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";

type Props = {
  readonly response: MemberShowResponse;
};
export const Member = (props: Props) => {
  const { state: chartId } = useContext(ChartIdContext);
  const handler = useMemberHandler(props.response);

  return (
    <>
      <ListItemText
        primary={props.response.name}
        secondary={`パートナーID:${props.response.id}, カルテID:${chartId}`}
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
