import { useParams } from "react-router-dom";
import { QRCodeDialog } from "../shared/QRCodeDialog";

type TRentalPickQRDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const RentalPickQRDialog = (props: TRentalPickQRDialogProps) => {
  const { rentalId } = useParams();

  return (
    <QRCodeDialog
      {...props}
      qrContentStr={JSON.stringify({ oRentalId: rentalId })}
    />
  );
};
