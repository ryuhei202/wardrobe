import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ReviewShowResponse } from "../../model/api/response/styling/review/ReviewShowResponse";
import { useSelectedReviewHandler } from "./handler/UseSelectedReviewHandler";
import { LineMessageUrlForm } from "./LineMessageUrlForm";

type TProps = {
  data: ReviewShowResponse;
  coordinateId: number;
};
export const SelectedReview = ({ data, coordinateId }: TProps) => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );

  const { SelectedReviewFormCallback } = useSelectedReviewHandler({
    setSeverity,
    setIsSnackBarOpen,
    setSnackBarText,
  });

  return (
    <>
      <Typography>レビュー</Typography>
      {
        <List dense>
          <ListItem>
            <ListItemText primary="評価" />
            <ListItemText primary={data.review?.selectedOption} />
          </ListItem>
          <ListItem>
            <ListItemText primary="理由" />
            <ListItemText
              primary={data.review?.reasons.map((reason) => (
                <span> / {reason} </span>
              ))}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="URL" />
          </ListItem>
          <Box component="form">
            <LineMessageUrlForm
              callback={SelectedReviewFormCallback()}
              lineMessageUrl={data.review?.lineMessageUrl}
              coordinateId={coordinateId}
            />
            <Snackbar
              open={isSnackBarOpen}
              autoHideDuration={5000}
              onClose={() => setIsSnackBarOpen(false)}
            >
              <Alert severity={severity}>{snackBarText}</Alert>
            </Snackbar>
          </Box>
        </List>
      }
    </>
  );
};
