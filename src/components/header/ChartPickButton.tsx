import { CropFree } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useAppStyle } from "../style/UseAppStyle";

type TProps = {
  onClick: () => void;
};

export const ChartPickButton = ({ onClick }: TProps) => {
  const classes = useAppStyle();

  return (
    <div className={classes.chartPickButton}>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<CropFree />}
        onClick={onClick}
        sx={{ fontWeight: "bold" }}
      >
        <Routes>
          <Route path="/rentals/:rentalId" element="レンタルピック"></Route>
          <Route path="*" element="カルテピック"></Route>
        </Routes>
      </Button>
    </div>
  );
};
