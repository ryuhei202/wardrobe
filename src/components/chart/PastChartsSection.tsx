import { ListAlt } from "@mui/icons-material";
import { IconButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { PastChartsDialogContainer } from "./PastChartsDialogContainer";
import { PreviousChartContainer } from "./PreviousChartContainer";

export const PastChartsSection = () => {
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] =
    useState<boolean>(false);
  return (
    <ListItemText>
      過去カルテ：
      <IconButton
        color="primary"
        onClick={() => setIsPastOutfitDialogOpen(true)}
        size="large"
      >
        <ListAlt />
      </IconButton>
      <PastChartsDialogContainer
        isOpen={isPastOutfitDialogOpen}
        setter={setIsPastOutfitDialogOpen}
      />
      <PreviousChartContainer />
    </ListItemText>
  );
};
