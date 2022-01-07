import { ListAlt } from "@mui/icons-material";
import { IconButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { KarteCollection } from "./KarteCollection";
import { KarteCollectionDialog } from "./KarteCollectionDialog";

type Props = {
  readonly response: KarteIndexResponse[];
};

export const KarteSection = (props: Props) => {
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] = useState<boolean>(
    false
  );

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
      <KarteCollectionDialog
        isOpen={isPastOutfitDialogOpen}
        response={props.response}
        onClose={() => setIsPastOutfitDialogOpen(false)}
      />
      {/* 最新２つのカルテを表示 */}
      <KarteCollection response={props.response.slice(0, 2)} />
    </ListItemText>
  );
};
