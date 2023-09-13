import { CircularProgress, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useRentalCoordinateShow } from "../../hooks/api/UseRentalCoordinateShow";
import { RentalIdContext } from "../context/RentalContextProvider";
import { RentalConfirm } from "./RentalConfirm";
import { RentalSelecting } from "./RentalSelecting";

export const RentalRightDrawerContents = () => {
  const { rentalId } = useContext(RentalIdContext);
  const [status, setStatus] = useState<"selecting" | "confirmed">("selecting");
  const { data: rentalCoordinate, error: rentalCoordinateError } =
    useRentalCoordinateShow({ rentalId });

  if (rentalCoordinateError) {
    return <Typography>{rentalCoordinateError.message}</Typography>;
  }

  if (!rentalCoordinate) {
    return <CircularProgress />;
  }

  switch (status) {
    case "selecting":
      return (
        <RentalSelecting
          key={rentalCoordinate.items.length}
          rentalCoordinateItems={rentalCoordinate.items}
          onClickCompleteButton={() => setStatus("confirmed")}
        />
      );
    case "confirmed":
      return (
        <RentalConfirm
          rentalCoordinate={rentalCoordinate}
          onClickBackButton={() => setStatus("selecting")}
        />
      );
    default:
      throw new Error("存在しないステータスです");
  }
};
