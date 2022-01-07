import { Dialog, DialogTitle } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { KarteCollection } from "./KarteCollection";

type Props = {
  isOpen: boolean;
  response: KarteIndexResponse[];
  onClose: () => void;
};

export const KarteCollectionDialog = (props: Props) => {
  return (
    <Dialog onClose={props.onClose} open={props.isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <KarteCollection response={props.response} />
    </Dialog>
  );
};
