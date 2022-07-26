import { CircularProgress, Typography } from "@mui/material";
import { useReviewsShow } from "../../hooks/api/UseReviewsShow";
import { SelectedReview } from "./SelectedReview";

type TProps = {
  readonly coordinateId: number;
};
export const SelectedReviewContainer = ({ coordinateId }: TProps) => {
  const { data, error } = useReviewsShow({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <SelectedReview data={data} coordinateId={coordinateId} />;
};
