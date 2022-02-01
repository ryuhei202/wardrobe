import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { FeedbacksContainer } from "../feedback/FeedbacksContainer";
import { MemberMemoContainer } from "../memberMemo/MemberMemoContainer";
import { HearingLayoutContainer } from "./HearingLayoutContainer";

const TABS = [
  { label: "フィードバック", content: <FeedbacksContainer /> },
  { label: "ヒアリング", content: <HearingLayoutContainer /> },
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
