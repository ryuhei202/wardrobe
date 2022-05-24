import { CircularProgress, Typography } from "@mui/material";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { KarteDialog } from "./KarteDialog";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly chartId: number;
};

export const KarteDialogContainer = ({ isOpen, onClose, chartId }: TProps) => {
  const { data, error } = useKartesShow({ chartId });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteDialog isOpen={isOpen} onClose={onClose} data={data} />;
};
