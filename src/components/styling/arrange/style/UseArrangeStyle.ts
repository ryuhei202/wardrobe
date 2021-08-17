import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useArrangeStyle = makeStyles((theme: Theme) =>
  createStyles({
    completeButton: {
      float: "right",
    },
  })
);
