import { Dialog, DialogTitle } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { NgCategoryIndexResponse } from "../../model/api/response/styling/ngCategory/NgCategoryIndexResponse";

type TProps = {
  readonly ngCategoryData: NgCategoryIndexResponse;
  readonly karteData: KarteIndexResponse[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
};
export const CreateNgMemoDialog = ({
  ngCategoryData,
  karteData,
  isOpen,
  onClose,
}: TProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>新規NGメモ追加</DialogTitle>
    </Dialog>
  );
};
