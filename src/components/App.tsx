import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import DefaultTheme from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";
import Styling from "./styling/Styling";

export const ChartId = React.createContext(
  parseInt(window.location.pathname.substring(1))
);

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
        <Styling />
      </div>
    </ThemeProvider>
  );
};

export default App;
