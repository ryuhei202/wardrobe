import { Drawer, Paper, Toolbar } from "@mui/material";
import React from "react";
import { ArrangeContainer } from "./arrange/ArrangeContainer";
import { useSelectingHandler } from "./handler/UseSelectingHandler";
import { KarteContainer } from "./karte/KarteContainer";
import { useSelectingStyle } from "./style/UseSelectingStyle";
import { SelectionConfirmContainer } from "./SelectionConfirmContainer";
import { MainContentType } from "../../model/selecting/MainContentType";
import { BrowseContainer } from "./browse/BrowseContainer";
import { SelectionProgress } from "./SelectionProgress";

export const Selecting = () => {
  const classes = useSelectingStyle();
  const handler = useSelectingHandler();

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
        <div className={classes.karteContainer}>
          <KarteContainer callback={handler.karteContainerCallback()} />
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
        {mainContent}
      </main>
    </>
  );
};
