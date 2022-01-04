import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useDrawerContentsStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerList: {
      maxWidth: 540,
    },
  })
);
