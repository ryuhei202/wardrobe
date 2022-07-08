import { CircularProgress, Typography } from "@mui/material";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { ChartDialog } from "./ChartDialog";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  chartId: number;
};
export const ChartDialogContainer = ({ isOpen, onClose, chartId }: TProps) => {
  const { data, error } = useKartesShow({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <ChartDialog isOpen={isOpen} onClose={onClose} data={data} />;
};
