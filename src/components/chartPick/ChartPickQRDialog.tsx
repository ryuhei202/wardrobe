import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { QRCodeDialog } from "../shared/QRCodeDialog";
import { RentalPickQRDialog } from "./RentalPickQRDialog";

type TChartPickQRDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ChartPickQRDialog = (props: TChartPickQRDialogProps) => {
  const chartId = useContext(ChartIdContext).state;

  return (
    <Routes>
      <Route
        path="/rentals/:rentalId"
        element={<RentalPickQRDialog {...props} />}
      />
      <Route
        path="*"
        element={
          chartId == null ? (
            <></>
          ) : (
            <QRCodeDialog
              open={props.open}
              onClose={props.onClose}
              qrContentStr={JSON.stringify({ chartId: chartId })}
            />
          )
        }
      />
    </Routes>
  );
};
