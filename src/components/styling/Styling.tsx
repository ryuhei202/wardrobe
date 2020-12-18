import { Drawer, Toolbar } from "@material-ui/core";
import React from "react";
import ItemBrowse from "./browse/ItemBrowse";
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
        <div className={classes.progressContainer}>
          <SelectionProgress
            data={handler.selectionProgressData()}
            callback={handler.selectionProgressCallback()}
          />
        </div>
      </Drawer>
      <main className={classes.browseContainer}>
        <Toolbar />
        <ItemBrowse callback={handler.itemBrowseCallback()} />
      </main>
    </>
  );
};

export default Styling;
