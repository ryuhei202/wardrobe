import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useFilterPartSizeStyle = makeStyles((theme: Theme) =>
  createStyles({
    presetSelectFormControl: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    presetSelect: {
      fontSize: "0.8rem",
    },
  })
);
