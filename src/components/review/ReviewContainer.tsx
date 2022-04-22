import { CircularProgress, Typography } from "@mui/material";
import { useReviewsShow } from "../../hooks/api/UseReviewsShow";

type TProps = {
  readonly coordinateId: number;
};
export const ReviewContainer = ({ coordinateId }: TProps) => {
  const { data, error } = useReviewsShow({ coordinateId });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <></>;
};
