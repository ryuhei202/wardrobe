import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
} from "@material-ui/core";
import { ExpandMore, ListAlt } from "@material-ui/icons";
import React from "react";
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
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>お話メモ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>
                前回のコーデ：
                <IconButton
                  color="primary"
                  onClick={handler.setPastOutfitDialogOpen}
                >
                  <ListAlt />
                </IconButton>
                <PastOutfitCollectionDialog
                  data={handler.pastOutfitDialogData()}
                  callback={handler.pastOutfitDialogCallback()}
                />
                <div>
                  {props.data.pastOutfits[0].items.map((item, index) => {
                    return (
                      <div className={classes.itemImage} key={index}>
                        <PopupImage
                          data={{
                            originalImageUrl: HostUrl() + item.imagePath.large,
                            popupImageUrl: HostUrl() + item.imagePath.original,
                            imageStyle: null,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <Paper variant="outlined">
                  <Typography>
                    {memoPresenter.lastCoordinate().map((word) => (
                      <>
                        {word}
                        <br></br>
                      </>
                    ))}
                  </Typography>
                </Paper>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                次回のコーデ：
                <Paper variant="outlined">
                  <Typography>
                    {memoPresenter.nextCoordinate().map((word) => (
                      <>
                        {word}
                        <br></br>
                      </>
                    ))}
                  </Typography>
                </Paper>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                その他：
                <Paper variant="outlined">
                  <Typography>
                    {memoPresenter.otherNote().map((word) => (
                      <>
                        {word}
                        <br></br>
                      </>
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
                      {memoPresenter.memoNgs().map((row) => (
                        <TableRow>
                          <TableCell>{row.categoryName}</TableCell>
                          <TableCell>{row.contentText}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Memo;
