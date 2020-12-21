import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Paper,
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
                  <Typography>{memoPresenter.lastCoordinate()}</Typography>
                </Paper>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                次回のコーデ：
                <Paper variant="outlined">
                  <Typography>{memoPresenter.nextCoordinate()}</Typography>
                </Paper>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                その他：
                <Paper variant="outlined">
                  <Typography>
                    ［NG］<br></br>［好み］<br></br>
                    ［チャレンジ］あり。苦手な色柄なし<br></br>
                    ［使用シーン］プライベート<br></br> ［体型］ †<br></br>{" "}
                    ［持ち物］<br></br>
                    【LINE】
                  </Typography>
                </Paper>
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Memo;
