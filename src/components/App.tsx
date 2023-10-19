import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ChartPageContainer } from "../pages/chart/ChartPageContainer";
import { CoordinatePageContainer } from "../pages/coordinate/CoordinatePageContainer";
import { RentalPageContainer } from "../pages/rentals/RentalPageContainer";
import { ChartPickQRDialog } from "./chartPick/ChartPickQRDialog";
import { AdminShowContextSetter } from "./context/AdminShowContextSetter";
import { ChartPageContextSetter } from "./context/ChartPageContextSetter";
import { CoordinatePageContextSetter } from "./context/CoordinatePageContextSetter";
import { RentalContextProvider } from "./context/RentalContextProvider";
import { ContextProvider } from "./context/provider/ContextProvider";
import { ChartPickButton } from "./header/ChartPickButton";
import { ChartShowButton } from "./header/ChartShowButton";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                    WARDROBE（GitHub）
                  </Typography>
                  <ChartShowButton />
                  <ChartPickButton onClick={() => setIsQRCodeOpen(true)} />
                  {user !== null && (
                    <div>
                      <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="profile-menu-appbar"
                        aria-haspopup="true"
                        onClick={() => setIsMenuOpen(true)}
                        color="inherit"
                      >
                        <Avatar
                          src={user.photoURL ?? undefined}
                          alt={user.displayName ?? undefined}
                        ></Avatar>
                      </IconButton>
                      <Menu
                        id="profile-menu-appbar"
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                      >
                        <MenuItem
                          onClick={() => {
                            setIsMenuOpen(false);
                            signOut(getAuth());
                          }}
                        >
                          ログアウト
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </Toolbar>
              </AppBar>
              <ChartPickQRDialog
                open={isQRCodeOpen}
                onClose={() => setIsQRCodeOpen(false)}
              />
              {user !== null ? (
                <AdminShowContextSetter email={user.email!}>
                  <Routes>
                    <Route
                      path="/chart"
                      element={
                        <ChartPageContextSetter>
                          <ChartPageContainer />
                        </ChartPageContextSetter>
                      }
                    />
                    <Route
                      path="/coordinate"
                      element={
                        <CoordinatePageContextSetter>
                          <CoordinatePageContainer />
                        </CoordinatePageContextSetter>
                      }
                    />
                    <Route
                      path="/rentals/:rentalId"
                      element={
                        <RentalContextProvider>
                          <RentalPageContainer />
                        </RentalContextProvider>
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
