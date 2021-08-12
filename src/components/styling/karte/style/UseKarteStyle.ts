import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useKarteStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerList: {
      maxWidth: 480,
    },
  })
);
