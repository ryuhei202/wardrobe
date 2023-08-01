import { CircularProgress, Typography } from "@mui/material";
import { useBrowsesDetail } from "../../hooks/api/UseBrowsesDetail";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { RentalItemDetail } from "./RentalItemDetail";

type TProps = {
  preregisteredItemId: number;
  currentRefinement: Refinement;
  defaultRefinement: Refinement;
  onClickBackButton: () => void;
  onChangeCurrentRefinement: (refinement: Refinement) => void;
  onItemSelect: () => void;
  currentItemId?: number;
};
export const RentalItemDetailContainer = ({
  preregisteredItemId,
  currentRefinement,
  defaultRefinement,
  onClickBackButton,
  onChangeCurrentRefinement,
  onItemSelect,
  currentItemId,
}: TProps) => {
  const {
    data: browseDetail,
    error: browseDetailError,
    isFetching,
  } = useBrowsesDetail({
    preregisteredItemId,
    refinement: currentRefinement,
  });

  if (browseDetailError)
    return <Typography>{browseDetailError.message}</Typography>;
  if (!browseDetail || isFetching) return <CircularProgress />;

  return (
    <RentalItemDetail
      browseDetail={browseDetail}
      defaultRefinement={defaultRefinement}
      onClickBackButton={onClickBackButton}
      onChangeCurrentRefinement={onChangeCurrentRefinement}
      onItemSelect={onItemSelect}
      currentItemId={currentItemId}
    />
  );
};
