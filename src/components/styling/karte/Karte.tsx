import React, { Fragment } from "react";
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
  Typography,
} from "@material-ui/core";
import { ListAlt, PhotoLibrary } from "@material-ui/icons";
import PopupImage from "../../shared/PopupImage";
import { HostUrl } from "../../../model/HostUrl";
import { InfoResponse } from "../../../model/api/response/styling/karte/InfoResponse";
import { useKarteHandler } from "./handler/UseKarteHandler";
import { useKartePresenter } from "./presenter/UseKartePresenter";
import { PastOutfitCollectionDialog } from "./PastOutfitCollectionDialog";
import { MemberImageCollectionDialog } from "./MemberImageCollectionDialog";

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
          前回のコーデ：
          <IconButton color="primary" onClick={handler.setPastOutfitDialogOpen}>
            <ListAlt />
          </IconButton>
          <PastOutfitCollectionDialog
            data={handler.pastOutfitDialogData()}
            callback={handler.pastOutfitDialogCallback()}
          />
          <div>
            {props.response.pastOutfits.length > 0
              ? props.response.pastOutfits[0].items.map((item, index) => {
                  return (
                    <div className={classes.itemImage} key={index}>
                      <PopupImage
                        data={{
                          originalImageUrl: HostUrl() + item.imagePath.large,
                          popupImageUrl: HostUrl() + item.imagePath.original,
                        }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <Paper variant="outlined">
            <Typography variant="body2">
              {presenter.lastCoordinate().map((word, index) => (
                <Fragment key={index}>
                  {word}
                  <br></br>
                </Fragment>
              ))}
            </Typography>
          </Paper>
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
    </List>
  );
};
