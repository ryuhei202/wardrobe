import { Drawer, Toolbar } from "@mui/material";
import { LeftDrawerContents } from "../../components/drawerContent/LeftDrawerContents";
import { RightDrawerContents } from "../../components/drawerContent/RightDrawerContents";
import { theme } from "../../components/style/Theme";
import { ChartMainContentsContainer } from "./ChartMainContentsContainer";

export const ChartPage = () => {
  return (
    <>
      <Drawer
        variant="permanent"
        style={{
          width: 360,
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <div>
          <LeftDrawerContents />
        </div>
      </Drawer>
      <div style={{ flexGrow: 1, paddingInline: theme.spacing(2) }}>
        <Toolbar />
        <ChartMainContentsContainer />
      </div>
      <Drawer
        variant="permanent"
        anchor="right"
        style={{
          width: 360,
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <div
          style={{
            overflow: "auto",
          }}
        >
          <RightDrawerContents />
        </div>
      </Drawer>
    </>
  );
};
