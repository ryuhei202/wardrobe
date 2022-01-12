import { Drawer, Toolbar } from "@mui/material";
import { DrawerContents } from "../drawerContent/DrawerContents";
import { HearingFormContainer } from "./HearingFormContainer";
import { useHearingStyle } from "./style/UseHearingStyle";

export const Hearing = () => {
  const classes = useHearingStyle();
  return (
    <>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContents}>
          <DrawerContents />
        </div>
      </Drawer>
      <div className={classes.hearingMainContainer}>
        <Toolbar />
        <HearingFormContainer />
      </div>
    </>
  );
};
