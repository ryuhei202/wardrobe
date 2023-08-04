import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useRentalReservationShow } from "../../../hooks/api/UseRentalReservationShow";
import { RentalIdContext } from "../../context/RentalContextProvider";
import { RentalReservation } from "./RentalReservation";

export const RentalReservationContainer = () => {
  const { rentalId } = useContext(RentalIdContext);
  const { data, error } = useRentalReservationShow({ rentalId });

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (!data) {
    return <CircularProgress />;
  }

  return <RentalReservation rentalReservationResponse={data} />;
};
