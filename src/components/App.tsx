import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { Button, Dialog, Toolbar, Typography } from "@material-ui/core";
import DefaultTheme from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";
import Styling from "./styling/Styling";
import { ThemeProvider } from "@material-ui/core/styles";
import QRCode from "react-qr-code";
import { ChartId } from "../model/ChartId";
import { CropFree } from "@material-ui/icons";

const App = () => {
  const classes = useAppStyle();

  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              WARDROBE
            </Typography>
            <span className={classes.qrCode}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<CropFree />}
                onClick={() => setIsQRCodeOpen(true)}
              >
                コーデピック
              </Button>
            </span>
          </Toolbar>
        </AppBar>
        <Dialog open={isQRCodeOpen} onClose={() => setIsQRCodeOpen(false)}>
          <QRCode value={ChartId().toString()} size={300} />
        </Dialog>
        <Styling />
      </div>
    </ThemeProvider>
  );
};

export default App;
