import { Drawer, Toolbar } from "@material-ui/core";
import React from "react";
import ArrangeContainer from "./arrange/ArrangeContainer";
import { useStylingHandler } from "./handler/UseStylingHandler";
import KarteContainer from "./karte/KarteContainer";
import { useStylingStyle } from "./style/UseStylingStyle";
import SelectionConfirmContainer from "./SelectionConfirmContainer";
import { MainContentType } from "../../model/styling/MainContentType";
import BrowseContainer from "./browse/BrowseContainer";

const Styling = () => {
  const classes = useStylingStyle();
  const handler = useStylingHandler();

  let mainContent;
  switch (handler.mainContentType) {
    case MainContentType.Browse: {
      mainContent = (
        <BrowseContainer
          callback={handler.itemBrowseCallback()}
          currentSelectedItemId={handler.currentSelectedItem()?.itemId ?? null}
        />
      );
      break;
    }
    case MainContentType.Confirm: {
      mainContent = (
        <SelectionConfirmContainer
          data={handler.selectionConfirmData()}
          callback={handler.selectionConfirmCallback()}
        />
      );
      break;
    }
    case MainContentType.Arrange: {
      mainContent = (
        <ArrangeContainer
          data={handler.arrangeData()}
          callback={handler.arrangeCallback()}
        />
      );
      break;
    }
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
