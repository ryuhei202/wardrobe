import { useParams } from "react-router-dom";
import { QRCodeDialog } from "../shared/QRCodeDialog";

type TRentalPickQRDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const RentalPickQRDialog = (props: TRentalPickQRDialogProps) => {
  const { rentalId: rentalIdString } = useParams();

  if (rentalIdString === undefined) throw new Error("rentalIdが無効です");
  const rentalId = parseInt(rentalIdString);

  if (Number.isNaN(rentalId)) throw new Error("rentalIdが無効です");

  return (
    <QRCodeDialog
      {...props}
      qrContentStr={JSON.stringify({ oRentalId: rentalId })}
    />
  );
};
