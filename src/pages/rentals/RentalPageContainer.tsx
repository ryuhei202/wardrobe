import { Drawer, Toolbar } from "@mui/material";
import { RentalLeftDrawerContents } from "../../components/rentals/RentalLeftDrawerContents";
import { RentalRightDrawerContents } from "../../components/rentals/RentalRightDrawerContents";
import { theme } from "../../components/style/Theme";

export const RentalPageContainer = () => {
  return (
    <>
      <Drawer
        variant="permanent"
        style={{
          width: 360,
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <div>
          <RentalLeftDrawerContents />
        </div>
      </Drawer>
      <div style={{ flexGrow: 1, paddingInline: theme.spacing(2) }}>
        <RentalRightDrawerContents />
      </div>
    </>
  );
};
