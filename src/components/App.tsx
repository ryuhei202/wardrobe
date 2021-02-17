import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { Toolbar, Typography } from "@material-ui/core";
import DefaultTheme from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";
import Styling from "./styling/Styling";
import { ThemeProvider } from "@material-ui/core/styles";

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
