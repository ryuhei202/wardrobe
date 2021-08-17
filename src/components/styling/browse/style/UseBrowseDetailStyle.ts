import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useBrowseDetailStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemImageContainer: {
      width: 400,
      marginRight: theme.spacing(2),
    },
    itemInfo: {
      display: "flex",
    },
    itemInfoText: {
      margin: theme.spacing(2, 0),
    },
    itemInfoTextContainer: {
      flexGrow: 1,
      margin: theme.spacing(0, 4, 0, 2),
    },
    colorImage: {
      margin: theme.spacing(1, 1),
    },
    itemTableContainer: {
      height: "auto",
      maxWidth: "100%",
    },
    button: {
      marginBlock: theme.spacing(1),
    },
  })
);
