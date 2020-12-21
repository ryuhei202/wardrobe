import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import MemoResponse from "../../../model/api/response/styling/karte/MemoResponse";
import { useKarteStyle } from "./style/UseKarteStyle";
import { useMemoPresenter } from "./presenter/UseMemoPresenter";

interface MemoProps {
  data: MemoResponse;
}

const Memo = (props: MemoProps) => {
  const classes = useKarteStyle();
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
