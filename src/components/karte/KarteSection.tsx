import { ListAlt } from "@mui/icons-material";
import { IconButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { KarteCollectionContainer } from "./KarteCollectionContainer";
import { KarteCollectionDialogContainer } from "./KarteCollectionDialogContainer";

export const KarteSection = () => {
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] =
    useState<boolean>(false);
  return (
    <ListItemText>
      過去のコーデ：
      <IconButton
        color="primary"
        onClick={() => setIsPastOutfitDialogOpen(true)}
        size="large"
      >
        <ListAlt />
      </IconButton>
      <KarteCollectionDialogContainer
        isOpen={isPastOutfitDialogOpen}
        setter={setIsPastOutfitDialogOpen}
      />
      {/* 最新２つのカルテを表示 */}
      <KarteCollectionContainer />
    </ListItemText>
  );
};
