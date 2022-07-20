import { Button, Grid, Typography } from "@mui/material";
import { HostUrl } from "../../model/HostUrl";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberMemoContainer } from "../memberMemo/MemberMemoContainer";
import { MemberSizeFetcher } from "../memberSize/MemberSizeFetcher";

export const MainContents = () => {
  const memberPhotoSUPath = `${HostUrl()}/igoue_admin/members/${useContextDefinedState(
    MemberIdContext
  )}/member_photos`;

  return (
    <>
      <div>
        <Button
          href={memberPhotoSUPath}
          target="_blank"
          variant="contained"
          color="secondary"
          style={{ float: "right" }}
        >
          会員写真登録
        </Button>
      </div>
      <Typography variant="body2" my={3}>
        ※Alt(Option) + Enterで保存
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={12} lg={6} xl={6}>
          <MemberMemoContainer />
        </Grid>
        <Grid item md={12} lg={6} xl={6}>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            サイズ情報
          </Typography>
          <MemberSizeFetcher />
        </Grid>
      </Grid>
    </>
  );
};
