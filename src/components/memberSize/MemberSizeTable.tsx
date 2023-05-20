import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { TMemberPartSizes } from "../../model/memberSize/MemberSizeTypes";
import { MemberSizeTableHandler } from "./MemberSizeTableHandler";
import { memberSizeTablePresenter } from "./MemberSizeTablePresenter";
import { MemberSizeNumberInput } from "./input/MemberSizeNumberInput";
import { StyledTableCell } from "./styleTable/StyledTableCell";
import { StyledTableRow } from "./styleTable/StyledTableRow";

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
              <StyledTableCell>
                <Typography>{rowData.referenceSize}</Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
