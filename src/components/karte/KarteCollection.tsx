import { ListAlt } from "@mui/icons-material";
import { IconButton, List, ListItemText } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { useKarteCollectionHandler } from "./handler/UseKarteCollectionHandler";
import { Karte } from "./Karte";
import { KarteCollectionDialog } from "./KarteCollectionDialog";

type Props = {
  readonly response: KarteIndexResponse[];
};

export const KarteCollection = (props: Props) => {
  const handler = useKarteCollectionHandler(props.response);
  return (
    <>
      <ListItemText>
        過去のコーデ：
        <IconButton
          color="primary"
          onClick={handler.setPastOutfitDialogOpen}
          size="large"
        >
          <ListAlt />
        </IconButton>
        <KarteCollectionDialog
          data={handler.pastOutfitDialogData()}
          callback={handler.pastOutfitDialogCallback()}
        />
        <List dense>
          {props.response.map((karte, index) => {
            if (2 <= index) {
              return <div key={index}></div>;
            }
            return <Karte data={karte} index={index} />;
          })}
        </List>
      </ListItemText>
    </>
  );
};
