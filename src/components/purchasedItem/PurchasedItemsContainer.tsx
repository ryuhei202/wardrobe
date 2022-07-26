import { CircularProgress, Typography } from "@mui/material";
import { usePurchasedItemsIndex } from "../../hooks/api/UsePurchasedItemsIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { PurchasedItemCollection } from "./PurchasedItemCollection";

export const PurchasedItemsContainer = () => {
  const { data, error } = usePurchasedItemsIndex({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <PurchasedItemCollection data={data} />;
};
