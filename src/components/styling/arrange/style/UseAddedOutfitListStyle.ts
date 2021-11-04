import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useAddedOutfitListStyle = makeStyles((theme: Theme) =>
  createStyles({
    registeredAdviceListContainer: {
      marginTop: theme.spacing(1),
    },
  })
);
