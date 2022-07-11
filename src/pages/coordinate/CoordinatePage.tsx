import { Drawer, Toolbar } from "@mui/material";
import { CoordinateIdContext } from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { LeftDrawerContents } from "../../components/drawerContent/LeftDrawerContents";
import { RightDrawerContents } from "../../components/drawerContent/RightDrawerContents";
import { theme } from "../../components/style/Theme";
import { CoordinateSelectingContainer } from "./CoordinateSelectingContainer";

export const CoordinatePage = () => {
  const coordinateId = useContextDefinedState(CoordinateIdContext);

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
        <CoordinateSelectingContainer />
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
        <div>
          <RightDrawerContents coordinateId={coordinateId} />
        </div>
      </Drawer>
    </>
  );
};
