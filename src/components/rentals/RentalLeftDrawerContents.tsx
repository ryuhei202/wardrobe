import { List, ListItem } from "@mui/material";
import { RentalRequestContainer } from "./rentalRequests/RentalRequestContainer";
import { RentalReservationContainer } from "./rentalReservations/RentalReservationContainer";

export const RentalLeftDrawerContents = () => {
  return (
    <List
      dense
      style={{
        maxWidth: 360,
      }}
    >
      <ListItem
        sx={{ position: "sticky", top: 70, zIndex: 100 }}
        style={{ backgroundColor: "white", borderBottom: "dashed 2px black" }}
      >
        <RentalReservationContainer />
      </ListItem>
      <ListItem>
        <RentalRequestContainer />
      </ListItem>
    </List>
  );
};
