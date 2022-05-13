import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { MemberMemoContainer } from "../memberMemo/MemberMemoContainer";

const TABS = [
  // TODO: 必要になったらコメントアウト { label: "フィードバック", content: <FeedbacksContainer /> },
  // TODO: 必要になったらコメントアウト { label: "ヒアリング", content: <HearingLayoutContainer /> },
  { label: "メモ", content: <MemberMemoContainer /> },
];

export const MainContents = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(_event, value) => setTabIndex(value)}>
          {TABS.map((tab) => (
            <Tab label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Typography variant="body2" m={3}>
        ※Alt(Option) + Enterで保存
      </Typography>
      {TABS[tabIndex].content}
    </>
  );
};
