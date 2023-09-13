import { Chip } from "@mui/material";
import {
  TRentalAppliedFilterData,
  TType,
} from "../../model/rental/TRentalAppliedFilterData";
import { useBrowseStyle } from "../selecting/browse/style/UseBrowseStyle";

interface AppliedFilterArrayProps {
  data: TRentalAppliedFilterData[];
  onDelete: ({ id, type }: { id: number; type: TType }) => void;
  onClear: () => void;
}

export const RentalAppliedFilterArray = ({
  data,
  onDelete,
  onClear,
}: AppliedFilterArrayProps) => {
  const classes = useBrowseStyle();
  return (
    <>
      {data.map((filter, index) => (
        <Chip
          color="secondary"
          className={classes.appliedFilter}
          key={index}
          label={filter.name}
          onDelete={() => onDelete({ id: filter.id, type: filter.type })}
        />
      ))}
      <Chip
        color="primary"
        onClick={onClear}
        className={classes.appliedFilter}
        label="全ての条件を解除"
      />
    </>
  );
};
