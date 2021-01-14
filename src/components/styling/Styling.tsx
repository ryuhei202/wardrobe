import { Drawer, Toolbar } from "@material-ui/core";
import React from "react";
import ItemBrowseContainer from "./browse/ItemBrowseContainer";
import { useStylingHandler } from "./handler/UseStylingHandler";
import KarteContainer from "./karte/KarteContainer";
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
        <KarteContainer
          data={handler.selectionProgressData()}
          callback={handler.selectionProgressCallback()}
        />
      </Drawer>
      <main className={classes.browseContainer}>
        <Toolbar />
        <ItemBrowseContainer callback={handler.itemBrowseCallback()} />
      </main>
    </>
  );
};

export default Styling;
