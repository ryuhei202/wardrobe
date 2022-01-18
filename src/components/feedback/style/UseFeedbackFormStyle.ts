import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useFeedbackFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemImage: {
      height: 225,
      marginRight: 5,
      borderRadius: "3%",
    },
    editIcon: {
      position: "absolute",
      bottom: 18,
      left: 544,
    },
    feedbackTextField: {
      width: 445,
    },
  })
);
