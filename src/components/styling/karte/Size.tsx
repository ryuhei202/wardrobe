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
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";

function createSizeData(header: string, size: string) {
  return { header, size };
}

const casualSizeRows = [
  createSizeData("肩幅(0~+1)", "43(43)"),
  createSizeData("バスト(-4~+4)", "99(99)"),
  createSizeData("着丈(-5~)", "70(70)"),
  createSizeData("袖丈(0~+1)", "61(61)"),
  createSizeData("首周り(0~+1)", "()"),
  createSizeData("ウエスト(±0)", "76(80)"),
  createSizeData("ヒップ(-2~+2)", "99(99)"),
  createSizeData("もも周り(-2~+2)", "74(74)"),
  createSizeData("股上", "()"),
  createSizeData("股下(-5~+5)", "74(74)"),
  createSizeData("ふくらはぎ(-2~+2)", "38(38)"),
  createSizeData("足のサイズ", "()"),
];

const jacketSizeRows = [
  createSizeData("サイズ", "(M：A体)"),
  createSizeData("肩幅", "()"),
  createSizeData("バスト", "()"),
  createSizeData("着丈", "()"),
  createSizeData("袖丈", "()"),
];

const Size = () => {
  const classes = useKarteStyle();

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>サイズ情報</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>身長：173cm</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>体重：60kg</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>BMI：20.0</ListItemText>
            </ListItem>
            <ListItem>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="size1a-content"
                  id="size1a-header"
                >
                  <Typography className={classes.heading}>
                    カジュアル部位サイズ
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>部位</TableCell>
                          <TableCell>設定(参考)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {casualSizeRows.map((row) => (
                          <TableRow>
                            <TableCell>{row.header}</TableCell>
                            <TableCell>{row.size}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </ListItem>
            <ListItem>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="size1a-content"
                  id="size1a-header"
                >
                  <Typography className={classes.heading}>
                    ジャケット部位サイズ
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>部位</TableCell>
                          <TableCell>設定(参考)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {jacketSizeRows.map((row) => (
                          <TableRow>
                            <TableCell>{row.header}</TableCell>
                            <TableCell>{row.size}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Size;
