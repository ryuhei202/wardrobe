import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useRentalFilters } from "../../hooks/api/UseRentalFilters";
import { RentalIdContext } from "../context/RentalContextProvider";
import { FilterList } from "./FilterList";

type TProps = {
  categoryId: number;
  onClickItemCard: (id: number) => void;
  selectedPreregisteredItemId?: number;
  onClickCancel: () => void;
  onItemSelect: () => void;
  currentItemId?: number;
};

export const FilterContainer = ({
  categoryId,
  onClickItemCard,
  selectedPreregisteredItemId,
  onClickCancel,
  onItemSelect,
  currentItemId,
}: TProps) => {
  const { rentalId } = useContext(RentalIdContext);
  const { data, error, isFetching } = useRentalFilters({
    categoryId,
    rentalId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data || isFetching) return <CircularProgress />;

  return (
    <FilterList
      filter={data}
      categoryId={categoryId}
      onClickItemCard={onClickItemCard}
      selectedPreregisteredItemId={selectedPreregisteredItemId}
      onClickCancel={onClickCancel}
      onItemSelect={onItemSelect}
      currentItemId={currentItemId}
    />
  );
};
