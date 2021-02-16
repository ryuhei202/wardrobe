import { Drawer, Toolbar } from "@material-ui/core";
import React from "react";
import ArrangeContainer from "./arrange/ArrangeContainer";
import ItemBrowseContainer from "./browse/ItemBrowseContainer";
import { useStylingHandler } from "./handler/UseStylingHandler";
import KarteContainer from "./karte/KarteContainer";
import { useStylingStyle } from "./style/UseStylingStyle";
import SelectionConfirmContainer from "./SelectionConfirmContainer";

const Styling = () => {
  const classes = useStylingStyle();
  const handler = useStylingHandler();

  let mainContent;
  if (handler.isConfirmed) {
    mainContent = (
      <ArrangeContainer
        data={handler.arrangeData()}
        callback={handler.arrangeCallback()}
      />
    );
  } else if (handler.isSelectionCompleted) {
    mainContent = (
      <SelectionConfirmContainer
        data={handler.selectionConfirmData()}
        callback={handler.selectionConfirmCallback()}
      />
    );
  } else if (handler.isKarteFetched) {
    mainContent = (
      <ItemBrowseContainer callback={handler.itemBrowseCallback()} />
    );
  }

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
          data={handler.karteContainerData()}
          callback={handler.karteContainerCallback()}
        />
      </Drawer>
      <main className={classes.browseContainer}>
        <Toolbar />
        {mainContent}
      </main>
    </>
  );
};

export default Styling;
