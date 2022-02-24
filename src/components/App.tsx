import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import { Button, Dialog, Paper, Toolbar, Typography } from "@mui/material";
import { theme } from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import QRCode from "react-qr-code";
import { CropFree } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ChartIdContext,
  ContextProvider,
} from "./context/provider/ContextProvider";
import { SelectingContextSetter } from "./context/SelectingContextSetter";
import { SelectingContainer } from "./selecting/SelectingContainer";
import { HearingContextSetter } from "./context/HearingContextSetter";
import { HearingContainer } from "./hearing/HearingContainer";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const App = () => {
  const classes = useAppStyle();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const chartId = useContext(ChartIdContext).state;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
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
                  <QRCode value={chartId?.toString() ?? ""} size={300} />
                </Paper>
              </Dialog>
              <Routes>
                <Route
                  path="/selecting"
                  element={
                    <SelectingContextSetter>
                      <SelectingContainer />
                    </SelectingContextSetter>
                  }
                ></Route>
                <Route
                  path="/hearing"
                  element={
                    <HearingContextSetter>
                      <HearingContainer />
                    </HearingContextSetter>
                  }
                />
              </Routes>
            </div>
          </ContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
