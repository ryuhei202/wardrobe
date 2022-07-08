import { Dialog, DialogTitle } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { ChartList } from "./ChartList";

type TProps = {
  response: KarteIndexResponse[];
  isOpen: boolean;
  setter: React.Dispatch<boolean>;
};

export const PastChartsDialog = ({ response, isOpen, setter }: TProps) => {
  return (
    <Dialog onClose={() => setter(false)} open={isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <ChartList response={response} />
    </Dialog>
  );
};
