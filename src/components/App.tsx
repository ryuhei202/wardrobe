import { CropFree } from "@mui/icons-material";
import { Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { AdminShowContextSetter } from "./context/AdminShowContextSetter";
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
  const [user, setUser] = useState<User | null>(null);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(getAuth(), provider).catch((error) => {
      if (error.code !== "auth/popup-closed-by-user") {
        // ユーザーがウィンドウを閉じた場合を除き、エラーをthrowする
        // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#error-codes_15
        throw error;
      }
    });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser === null) {
        signIn();
      }
    });
  }, []);

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
              {user !== null ? (
                <AdminShowContextSetter email={user.email!}>
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
                </AdminShowContextSetter>
              ) : (
                <Button style={{ margin: "auto" }} onClick={signIn}>
                  ログインする
                </Button>
              )}
            </div>
          </ContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
