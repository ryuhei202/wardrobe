import {
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
import React from "react";
import SizeResponse from "../../../model/api/response/styling/karte/SizeResponse";
import {
  CasualPartSizeElement,
  useCasualPartSizePresenter,
} from "./presenter/UseCasualPartSizePresenter";
import {
  JacketPartSizeElement,
  useJacketPartSizePresenter,
} from "./presenter/UseJacketPartSizePresenter";
import { useSizePresenter } from "./presenter/UseSizePresenter";
import { useKarteStyle } from "./style/UseKarteStyle";

interface SizeProps {
  data: SizeResponse;
}

const Size = (props: SizeProps) => {
  const classes = useKarteStyle();
  const presenter = useSizePresenter(props.data);
  const casualPresenter = useCasualPartSizePresenter(props.data.casualPartSize);
  const jacketPresenter = useJacketPartSizePresenter(props.data.jacketPartSize);

  return (
    <List dense>
      {presenter.resultList().map((text: string, index: number) => (
        <ListItem key={index}>
          <ListItemText>{text}</ListItemText>
        </ListItem>
      ))}
      <ListItem>
        <Typography className={classes.heading}>
          カジュアル部位サイズ
        </Typography>
      </ListItem>
      <ListItem>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>部位</TableCell>
                <TableCell>設定(参考)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casualPresenter
                .resultList()
                .map((row: CasualPartSizeElement, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.size}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ListItem>
      <ListItem>
        <Typography className={classes.heading}>
          ジャケット部位サイズ
        </Typography>
      </ListItem>
      <ListItem>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>部位</TableCell>
                <TableCell>設定</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jacketPresenter
                .resultList()
                .map((row: JacketPartSizeElement, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>
                      {/* サーバー側の処理でHTMLタグを文字列で返してる部分があるのでここでフロント側で判別 */}
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: row.size }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ListItem>
    </List>
  );
};

export default Size;
