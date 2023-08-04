import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useRentalCoordinateShow } from "../../../hooks/api/UseRentalCoordinateShow";
import { useRentalRequestShow } from "../../../hooks/api/UseRentalRequestShow";
import { RentalIdContext } from "../../context/RentalContextProvider";
import { RentalRequest } from "./RentalRequest";

export const RentalRequestContainer = () => {
  const { rentalId } = useContext(RentalIdContext);
  const { data: rentalRequest, error: rentalRequestError } =
    useRentalRequestShow({ rentalId });
  const { data: rentalCoordinate, error: rentalCoordinateError } =
    useRentalCoordinateShow({
      rentalId,
    });

  if (rentalRequestError) {
    return <Typography>{rentalRequestError.message}</Typography>;
  }
  if (rentalCoordinateError) {
    return <Typography>{rentalCoordinateError.message}</Typography>;
  }

  if (!rentalRequest || !rentalCoordinate) {
    return <CircularProgress />;
  }

  return (
    <RentalRequest
      rentalRequestResponse={rentalRequest}
      coordinateChoiceId={rentalCoordinate.coordinateChoiceId}
    />
  );
};
