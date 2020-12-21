import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { Drawer, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import Karte from "./styling/karte/Karte";
import SelectionProgress from "./styling/selection_progress/SelectionProgress";
import ItemBrowse from "./styling/browse/ItemBrowse";
import DefaultTheme from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";

const App = () => {
  const classes = useAppStyle();

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              WARDROBE
            </Typography>
          </Toolbar>
        </AppBar>
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
            <SelectionProgress />
          </div>
        </Drawer>
        <main className={classes.browseContainer}>
          <Toolbar />
          <ItemBrowse />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
