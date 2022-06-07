import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { TMemberPartSizes } from "../../model/memberSize/MemberSizeTypes";
import { MemberSizeNumberInput } from "./input/MemberSizeNumberInput";
import { MemberSizeTableHandler } from "./MemberSizeTableHandler";
import { memberSizeTablePresenter } from "./MemberSizeTablePresenter";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  width: "25%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TProps = {
  editingSizes: TMemberPartSizes;
  fetchedSizes: TMemberPartSizes;
  onChangeEditingSizes: (editingSizes: TMemberPartSizes) => void;
  onSubmit: () => void;
  style?: React.CSSProperties;
};

export const MemberSizeTable = ({
  editingSizes,
  fetchedSizes,
  onChangeEditingSizes,
  onSubmit,
  style,
}: TProps) => {
  const handler = MemberSizeTableHandler({
    editingSizes,
    onChangeEditingSizes,
  });

  const presenter = memberSizeTablePresenter({
    handleChangeSize: handler.handleChangeSize,
    editingSizes,
    fetchedSizes,
  });

  return (
    <TableContainer style={style}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>部位</StyledTableCell>
            <StyledTableCell>サイズ</StyledTableCell>
            <StyledTableCell>ジャケット</StyledTableCell>
            <StyledTableCell>参考サイズ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {presenter.rowDatas.map((rowData) => (
            <StyledTableRow key={rowData.name}>
              <StyledTableCell>
                <Typography fontWeight={"bold"} variant={"subtitle2"}>
                  {rowData.name}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <MemberSizeNumberInput
                  {...rowData.size}
                  onKeyDownEnter={onSubmit}
                />
              </StyledTableCell>
              <StyledTableCell>
                {rowData.jacketSize ? (
                  <MemberSizeNumberInput
                    {...rowData.jacketSize}
                    onKeyDownEnter={onSubmit}
                  />
                ) : null}
              </StyledTableCell>
              <StyledTableCell>{rowData.referenceSize}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
