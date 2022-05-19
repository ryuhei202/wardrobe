import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { HostUrl } from "../../model/HostUrl";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberMemoContainer } from "../memberMemo/MemberMemoContainer";

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
      <Typography variant="body2" m={3}>
        ※Alt(Option) + Enterで保存
      </Typography>
      <MemberMemoContainer />
    </>
  );
};
