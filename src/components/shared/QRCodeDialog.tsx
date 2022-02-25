import { Dialog, Paper } from "@mui/material";
import QRCode from "react-qr-code";

type TQRCodeDialogProps = {
  qrContentStr: string;
  open: boolean;
  onClose: () => void;
};

export const QRCodeDialog = (props: TQRCodeDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Paper style={{ padding: "25px" }}>
        <QRCode value={props.qrContentStr} size={300} />
      </Paper>
    </Dialog>
  );
};
