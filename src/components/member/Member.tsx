import { PhotoLibrary } from "@mui/icons-material";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { PlanTag } from "../shared/PlanTag";
import { useMemberHandler } from "./handler/UseMemberHandler";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";

type Props = {
  readonly response: MemberShowResponse;
};
export const Member = (props: Props) => {
  const chartId = useContext(ChartIdContext).state;
  const handler = useMemberHandler(props.response);

  return (
    <>
      <ListItemText
        primary={
          <>
            {props.response.isSuspended ? (
              <PlanTag color="plain" name="停止中" />
            ) : (
              <PlanTag
                color={props.response.isLeeapPlan ? "leeap" : "uwear"}
                name={props.response.planName}
              />
            )}
            <Typography variant="h4">{`${props.response.name}(${props.response.age}), ${props.response.pref}`}</Typography>
          </>
        }
        secondary={
          <Typography variant="h6">{`パートナーID: ${props.response.id}, ${
            chartId !== null ? "カルテID: " + chartId : ""
          }`}</Typography>
        }
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
