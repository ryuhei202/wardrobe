import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { StylingReferenceList } from "../stylingReference/StylingReferenceList";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { Items } from "./Items";
import { Outfits } from "./Outfits";

type Props = {
  readonly data: KarteIndexResponse;
  readonly index: number;
};

export const Karte = (props: Props) => {
  const handler = useKarteHandler();

  return (
    <ListItem key={props.index}>
      <ListItemText>
        発送日：
        {props.data.rentalStartedAt
          ? new Date(props.data.rentalStartedAt!).toLocaleDateString()
          : ""}
        <br />
        ヒアリング情報：
        <StylingReferenceList response={props.data.stylingReferences} />
        <br />
        コーデの評価：
        <Paper variant="outlined">
          <Typography variant="body2">
            {props.data.feedback.split("\n").map((word, index) => (
              <Fragment key={index}>
                {word}
                <br></br>
              </Fragment>
            ))}
          </Typography>
        </Paper>
        <List dense>
          <Switch
            checked={handler.isChecked}
            onChange={handler.onChangeItemCollection}
            inputProps={{ "aria-label": "controlled" }}
          />
          アイテム単位
          {handler.isChecked ? (
            <Items data={props.data.items} />
          ) : (
            <Outfits data={props.data.coordinates} />
          )}
        </List>
      </ListItemText>
    </ListItem>
  );
};
