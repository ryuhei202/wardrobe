import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useBrowsesIndex } from "../../hooks/api/UseBrowsesIndex";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { RentalItemCardCollection } from "./RentalItemCardCollection";

type TProps = {
  currentRefinement: Refinement;
  onChangeTotalCount: (totalCount: number) => void;
  onClickItemCard: (id: number) => void;
  onChangeTotalPageNum: (totalPageNum: number) => void;
};
export const RentalItemBrowse = ({
  currentRefinement,
  onChangeTotalCount,
  onClickItemCard,
  onChangeTotalPageNum,
}: TProps) => {
  const { data: browsesIndex, error: browsesIndexError } = useBrowsesIndex({
    refinement: currentRefinement,
  });

  useEffect(() => {
    onChangeTotalCount(browsesIndex?.totalCount ?? 0);
    onChangeTotalPageNum(browsesIndex?.totalPageNum ?? 0);
  }, [browsesIndex]);

  if (browsesIndexError) return <Typography>{browsesIndexError.message}</Typography>;
  if (!browsesIndex) return <CircularProgress />;

  return (
    <RentalItemCardCollection items={browsesIndex.itemCard} onClickItemCard={onClickItemCard} />
  );
};
