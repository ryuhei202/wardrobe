import { Drawer, Paper, Toolbar } from "@material-ui/core";
import React from "react";
import ItemBrowseContainer from "./browse/ItemBrowseContainer";
import { useStylingHandler } from "./handler/UseStylingHandler";
import Karte from "./karte/Karte";
import SelectionProgress from "./SelectionProgress";
import { useStylingStyle } from "./style/UseStylingStyle";

const Styling = () => {
  const classes = useStylingStyle();
  const handler = useStylingHandler();

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
        <div className={classes.karteContainer}>
          <Karte />
        </div>
        <Paper variant="outlined" className={classes.progressContainer}>
          <SelectionProgress
            data={handler.selectionProgressData()}
            callback={handler.selectionProgressCallback()}
          />
        </Paper>
      </Drawer>
      <main className={classes.browseContainer}>
        <Toolbar />
        <ItemBrowseContainer callback={handler.itemBrowseCallback()} />
      </main>
    </>
  );
};

export default Styling;
