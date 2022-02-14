import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { usePurchasedItemsIndex } from "../../hooks/api/UsePurchasedItemsIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { PurchasedItemCollection } from "./PurchasedItemCollection";

export const PurchasedItemsContainer = () => {
  const { data, error } = usePurchasedItemsIndex({
    memberId: useContext(MemberIdContext).state!,
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <PurchasedItemCollection data={data} />;
};
