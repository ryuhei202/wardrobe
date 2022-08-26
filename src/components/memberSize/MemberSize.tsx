import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../style/Theme";

type TProps = {
  shouldActiveSubmitBtn: boolean;
  onClickSubmitBtn: () => void;
  basicSizeComponent: ReactNode;
  partSizeComponent: ReactNode;
  isLoadingSubmit: boolean;
  aboutSize: string | null;
  style?: React.CSSProperties;
};

export const MemberSize = ({
  shouldActiveSubmitBtn,
  onClickSubmitBtn,
  basicSizeComponent,
  partSizeComponent,
  isLoadingSubmit,
  style,
  aboutSize,
}: TProps) => {
  return (
    <Paper
      variant="outlined"
      elevation={0}
      style={{ padding: theme.spacing(1), ...style }}
    >
      {basicSizeComponent}
      <Divider style={{ margin: "16px 0" }} />
      {partSizeComponent}
      <Typography
        style={{ marginTop: 16, fontSize: "0.6rem", fontWeight: "bold" }}
      >
        お困りポイント
      </Typography>
      <Paper variant="outlined">
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          {aboutSize ?? <span style={{ color: "gray" }}>なし</span>}
        </Typography>
      </Paper>
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
