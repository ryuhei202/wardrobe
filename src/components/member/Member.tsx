import { PhotoLibrary } from "@mui/icons-material";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { ChartIdContext } from "../context/provider/ContextProvider";
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
            <Paper
              elevation={0}
              style={{
                backgroundColor: props.response.isLeeapPlan
                  ? "#00266F"
                  : "#E8E7DF",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                color={props.response.isLeeapPlan ? "white" : "#4C5257"}
              >
                {props.response.planName}
              </Typography>
            </Paper>
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
