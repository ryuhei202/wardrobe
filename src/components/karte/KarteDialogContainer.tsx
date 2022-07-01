import { CircularProgress, Typography } from "@mui/material";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { KarteDialog } from "./KarteDialog";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly chartId?: number;
};

export const KarteDialogContainer = ({ isOpen, onClose, chartId }: TProps) => {
  const { data, error } = useKartesShow({ chartId });
  if (chartId === undefined) return <></>;

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <KarteDialog isOpen={isOpen} onClose={onClose} data={data} />;
};
