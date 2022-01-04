import { CircularProgress, Typography } from "@mui/material";
import { usePurchasedItemsIndex } from "../../hooks/api/UsePurchasedItemsIndex";
import { PurchasedItemCollection } from "../selecting/karte/PurchasedItemCollection";

export const PurchasedItemsContainer = () => {
  const { data, error } = usePurchasedItemsIndex();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <PurchasedItemCollection data={data} />;
};
