import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  shouldActiveSubmitBtn: boolean;
  onClickSubmitBtn: () => void;
  basicSizeComponent: ReactNode;
  partSizeComponent: ReactNode;
  isLoadingSubmit: boolean;
  style?: React.CSSProperties;
};

export const MemberSize = ({
  shouldActiveSubmitBtn,
  onClickSubmitBtn,
  basicSizeComponent,
  partSizeComponent,
  isLoadingSubmit,
  style,
}: TProps) => {
  return (
    <Paper
      variant="outlined"
      elevation={0}
      style={{ padding: "2rem", ...style }}
    >
      {basicSizeComponent}
      <Divider style={{ margin: "16px 0" }} />
      {partSizeComponent}
      <Grid container justifyContent={"flex-end"} mt={2}>
        <Button
          onClick={onClickSubmitBtn}
          disabled={!shouldActiveSubmitBtn || isLoadingSubmit}
          variant="contained"
          color="secondary"
          size="small"
          disableElevation
        >
          <Typography variant="button" fontWeight={"bold"}>
            サイズ情報を更新
          </Typography>
        </Button>
      </Grid>
    </Paper>
  );
};
