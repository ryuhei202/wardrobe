import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { Drawer, Toolbar, Typography } from "@material-ui/core";
import Karte from "./components/styling/karte/Karte";
import SelectionProgress from "./components/styling/selection_progress/SelectionProgress";
import ItemSelection from "./components/styling/item_selction/ItemSelection";

const App = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Wardrobe
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Karte />
        <SelectionProgress />
      </Drawer>
      <ItemSelection />
    </>
  );
};

export default App;
