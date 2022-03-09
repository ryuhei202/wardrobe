import { CropFree } from "@mui/icons-material";
import { Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { HearingContextSetter } from "./context/HearingContextSetter";
import { ContextProvider } from "./context/provider/ContextProvider";
import { SelectingContextSetter } from "./context/SelectingContextSetter";
import { CordePickQRDialog } from "./cordePick/CordePickQRDialog";
import { HearingContainer } from "./hearing/HearingContainer";
import { SelectingContainer } from "./selecting/SelectingContainer";
import { theme } from "./style/Theme";
import { useAppStyle } from "./style/UseAppStyle";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const App = () => {
  const classes = useAppStyle();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
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
              <CordePickQRDialog
                open={isQRCodeOpen}
                onClose={() => setIsQRCodeOpen(false)}
              />
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
