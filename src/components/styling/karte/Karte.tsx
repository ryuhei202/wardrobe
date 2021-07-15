import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { ListAlt, PhotoLibrary } from "@material-ui/icons";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { useKartePresenter } from "./presenter/UseKartePresenter";
import { PastOutfitCollectionDialog } from "./PastOutfitCollectionDialog";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";
import { PastOutfitCollection } from "./PastOutfitCollection";
import { PurchasedItemCollection } from "./PurchasedItemCollection";

interface KarteProps {
  response: InfoResponse;
}

export const Karte = (props: KarteProps) => {
  const classes = useKarteStyle();
  const handler = useKarteHandler(props.response);
  const presenter = useKartePresenter(props.response);

  return (
    <List dense className={classes.drawerList}>
      <ListItem>
        <ListItemText
          primary={presenter.memberInfoPrimaryText()}
          secondary={presenter.memberInfoSecondaryText()}
        />
        <ListItemSecondaryAction>
          <IconButton
            color="primary"
            onClick={handler.setMemberImageDialogOpen}
          >
            <PhotoLibrary />
          </IconButton>
          <MemberImageCollectionDialog
            data={handler.memberImageDialogData()}
            callback={handler.memberImageDialogCallback()}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText>
          過去のコーデ：
          <IconButton color="primary" onClick={handler.setPastOutfitDialogOpen}>
            <ListAlt />
          </IconButton>
          <PastOutfitCollectionDialog
            data={handler.pastOutfitDialogData()}
            callback={handler.pastOutfitDialogCallback()}
          />
          <PastOutfitCollection data={handler.pastOutfitCollectionData()} />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          NGメモ：
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                {presenter.memoNgs().map((row, index) => (
                  <Tooltip
                    title={presenter.ngTimestamp(index)}
                    placement="right"
                    key={index}
                  >
                    <TableRow>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell>{row.contentText}</TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          購入済アイテム：
          <PurchasedItemCollection
            data={handler.purchasedItemCollectionData()}
          />
        </ListItemText>
      </ListItem>
    </List>
  );
};
