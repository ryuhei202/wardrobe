import { useState } from "react";
import { TRentalFiltersResponse } from "../../hooks/api/UseRentalFilters";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { RentalItemBrowseContainer } from "./RentalItemBrowseContainer";
import { RentalItemDetailContainer } from "./RentalItemDetailContainer";

type TProps = {
  filter: TRentalFiltersResponse;
  categoryId: number;
  onClickItemCard: (id: number) => void;
  selectedPreregisteredItemId?: number;
  onClickCancel: () => void;
  onItemSelect: () => void;
  currentItemId?: number;
};
export const FilterList = ({
  filter,
  categoryId,
  onClickItemCard,
  selectedPreregisteredItemId,
  onClickCancel,
  onItemSelect,
  currentItemId,
}: TProps) => {
  const [currentRefinement, setCurrentRefinement] = useState<Refinement>(filter.defaultRefinement);

  const handleChangeCurrentRefinement = (refinement: Refinement) => {
    setCurrentRefinement(refinement);
  };

  return selectedPreregisteredItemId === undefined ? (
    <RentalItemBrowseContainer
      filter={filter}
      currentRefinement={currentRefinement}
      categoryId={categoryId}
      onClickItemCard={onClickItemCard}
      onChangeCurrentRefinement={handleChangeCurrentRefinement}
    />
  ) : (
    <RentalItemDetailContainer
      preregisteredItemId={selectedPreregisteredItemId}
      currentRefinement={currentRefinement}
      defaultRefinement={filter.defaultRefinement}
      onClickBackButton={onClickCancel}
      onChangeCurrentRefinement={handleChangeCurrentRefinement}
      onItemSelect={onItemSelect}
      currentItemId={currentItemId}
    />
  );
};
