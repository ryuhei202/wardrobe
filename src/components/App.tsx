import React, { useState, createContext } from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import { Button, Dialog, Paper, Toolbar, Typography } from "@mui/material";
import { theme } from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";
import { Selecting } from "./selecting/Selecting";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import QRCode from "react-qr-code";
import { ChartId } from "../model/ChartId";
import { CropFree } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import qs from "qs";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const MemberIdContext = React.createContext(0);
export const ChartIdContext = React.createContext(0);

export const App = () => {
  const classes = useAppStyle();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const chartId = qs.parse(window.location.search.substring(1)).chartId;
  const memberId = qs.parse(window.location.search.substring(1)).memberId;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MemberIdContext.Provider value={Number(memberId) ?? 0}>
          <ChartIdContext.Provider value={Number(chartId) ?? 0}>
            <div className={classes.root}>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" noWrap className={classes.title}>
                    WARDROBE
                  </Typography>
                  <span className={classes.coordePickButton}>
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
              <Dialog
                open={isQRCodeOpen}
                onClose={() => setIsQRCodeOpen(false)}
              >
                <Paper className={classes.qrCodeContainer}>
                  <QRCode value={ChartId().toString()} size={300} />
                </Paper>
              </Dialog>
              <Routes>
                <Route path="/selecting" element={<Selecting />} />
              </Routes>
            </div>
          </ChartIdContext.Provider>
        </MemberIdContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
