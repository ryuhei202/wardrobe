import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import DetailItemTableData from "../../../model/styling/browse/props_data/DetailItemTableData";
import DetailItemTableCallback from "./callback/DetailItemTableCallback";

interface DetailItemTableProps {
  data: DetailItemTableData;
  callback: DetailItemTableCallback;
}

const DetailItemTable = (props: DetailItemTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="item table">
        <TableHead>
          <TableRow>
            <TableCell>アイテムID</TableCell>
            {props.data.columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, index) => (
            <TableRow
              selected={row.isSelected}
              onClick={() => props.callback.onSelect(row.itemId)}
              key={index}
            >
              <TableCell>{row.itemId}</TableCell>
              {row.values.map((value, index) => (
                <TableCell key={index}>{value ?? ""}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailItemTable;
