import { CircularProgress, Typography } from "@mui/material";
import { useFootwearsIndex } from "../../hooks/api/UseFootwearsIndex";
import { SelectFootwearDialog } from "./SelectFootwearDialog";

type TProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onClick: (footwearId: number) => void;
};

export const SelectFootwearDialogContainer = ({
  isOpen,
  onClose,
  onClick,
}: TProps) => {
  const { data: footwearIndexData, error: footwearIndexError } =
    useFootwearsIndex();

  if (footwearIndexError)
    return <Typography>{footwearIndexError.message}</Typography>;

  if (!footwearIndexData) return <CircularProgress />;

  return (
    <SelectFootwearDialog
      footwearIndexData={footwearIndexData}
      isOpen={isOpen}
      onClose={onClose}
      onClick={onClick}
    />
  );
};
