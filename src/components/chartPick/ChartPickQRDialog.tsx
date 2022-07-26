import { useContext } from "react";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { QRCodeDialog } from "../shared/QRCodeDialog";

type TChartPickQRDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ChartPickQRDialog = (props: TChartPickQRDialogProps) => {
  const chartId = useContext(ChartIdContext).state;

  return (
    <>
      {chartId == null ? (
        <></>
      ) : (
        <QRCodeDialog
          open={props.open}
          onClose={props.onClose}
          qrContentStr={chartId.toString()}
        />
      )}
    </>
  );
};
