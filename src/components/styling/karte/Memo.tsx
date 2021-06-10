import {
  IconButton,
  List,
  ListItem,
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
import { ListAlt } from "@material-ui/icons";
import React, { Fragment } from "react";
import MemoResponse from "../../../model/api/response/styling/karte/MemoResponse";
import { useKarteStyle } from "./style/UseKarteStyle";
import { useMemoPresenter } from "./presenter/UseMemoPresenter";
import PopupImage from "../../shared/PopupImage";
import { HostUrl } from "../../../model/HostUrl";
import PastOutfitCollectionDialog from "./PastOutfitCollectionDialog";
import { useMemoHandler } from "./handler/UseMemoHandler";

interface MemoProps {
  data: MemoResponse;
}

const Memo = (props: MemoProps) => {
  const classes = useKarteStyle();
  const handler = useMemoHandler(props.data);
  const memoPresenter = useMemoPresenter(props.data);

  return (
    <List dense>
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
            {props.data.pastOutfits.length > 0
              ? props.data.pastOutfits[0].items.map((item, index) => {
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
              {memoPresenter.lastCoordinate().map((word, index) => (
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
          次回のコーデ：
          <Paper variant="outlined">
            <Typography variant="body2">
              {memoPresenter.nextCoordinate().map((word, index) => (
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
          その他：
          <Paper variant="outlined">
            <Typography variant="body2">
              {memoPresenter.otherNote().map((word, index) => (
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
                {memoPresenter.memoNgs().map((row, index) => (
                  <Tooltip
                    title={memoPresenter.ngTimestamp(index)}
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

export default Memo;
