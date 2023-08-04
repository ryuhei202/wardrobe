import { ListItemText, Typography } from "@mui/material";
import { useContext } from "react";
import { TRentalReservationShowResponse } from "../../../hooks/api/UseRentalReservationShow";
import { RentalIdContext } from "../../context/RentalContextProvider";

type TProps = {
  readonly rentalReservationResponse: TRentalReservationShowResponse;
};

export const RentalReservation = ({ rentalReservationResponse }: TProps) => {
  const { rentalId } = useContext(RentalIdContext);
  return (
    <div>
      <ListItemText
        primary={
          <Typography variant="h4">{`${rentalReservationResponse.lastName} ${rentalReservationResponse.firstName}(${rentalReservationResponse.age})`}</Typography>
        }
        secondary={
          <>
            <Typography variant="h6">{`レンタルID: ${rentalId}`}</Typography>
            <Typography variant="h6">{`撮影日: ${rentalReservationResponse.shootingAt}`}</Typography>
          </>
        }
      />
    </div>
  );
};
