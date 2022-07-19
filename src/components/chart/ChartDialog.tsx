import { Dialog, DialogTitle } from "@mui/material";
import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { Chart } from "./Chart";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly data: KarteShowResponse;
};

export const ChartDialog = ({ isOpen, onClose, data }: TProps) => {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <Chart id={data.id} rentalStartedAt={data.rentalStartedAt} />
    </Dialog>
  );
};
