import { Dialog, DialogTitle } from "@mui/material";
import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { Karte } from "./Karte";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly data: KarteShowResponse;
};

export const KarteDialog = ({ isOpen, onClose, data }: TProps) => {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <Karte
        id={data.id}
        rentalStartedAt={data.rentalStartedAt}
        memoNext={data.memoNext}
        index={data.id}
      />
    </Dialog>
  );
};
