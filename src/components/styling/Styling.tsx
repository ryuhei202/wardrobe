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
        {handler.isConfirmed ? (
          <ArrangeContainer
            data={handler.arrangeData()}
            callback={handler.arrangeCallback()}
          />
        ) : (
          <>
            {handler.isSelectionCompleted ? (
              <SelectionConfirmContainer
                data={handler.selectionConfirmData()}
                callback={handler.selectionConfirmCallback()}
              />
            ) : (
              <ItemBrowseContainer callback={handler.itemBrowseCallback()} />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Styling;
