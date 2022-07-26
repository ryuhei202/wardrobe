import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
  const [isUrlEditing, setIsUrlEditing] = useState<boolean>(false);
  const { selectedReviewFormCallback } = useSelectedReviewHandler({
    setSeverity,
    setIsSnackBarOpen,
    setSnackBarText,
  });

  return (
    <>
      {data.review === null ? (
        <Typography variant="body1">レビュー未回答</Typography>
      ) : (
        <List dense>
          <ListItem divider>
            <ListItemText primary="評価" />
            <ListItemText
              primary={data.review?.selectedOption}
              style={{ width: "80%" }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="理由" />
            <ListItemText
              primary={data.review?.reasons.join("/")}
              style={{ width: "80%" }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="テキスト" />
            <ListItemText
              primary={data.review?.text}
              style={{ width: "80%" }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="URL" />
          </ListItem>
          <Box component="form">
            {isUrlEditing ? (
              <LineMessageUrlForm
                callback={selectedReviewFormCallback()}
                lineMessageUrl={data.review?.lineMessageUrl}
                coordinateId={coordinateId}
                setIsUrlEditing={setIsUrlEditing}
              />
            ) : (
              <>
                <a
                  href={data.review?.lineMessageUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.review?.lineMessageUrl ?? ""}
                </a>
                <EditIcon
                  onClick={() => setIsUrlEditing(true)}
                  style={{
                    position: "absolute",
                    right: 15,
                    cursor: "pointer",
                  }}
                />
              </>
            )}
            <Snackbar
              open={isSnackBarOpen}
              autoHideDuration={5000}
              onClose={() => setIsSnackBarOpen(false)}
            >
              <Alert severity={severity}>{snackBarText}</Alert>
            </Snackbar>
          </Box>
        </List>
      )}
    </>
  );
};
