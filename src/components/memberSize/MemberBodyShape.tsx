import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StyledTableCell } from "./styleTable/StyledTableCell";
import { StyledTableRow } from "./styleTable/StyledTableRow";

type TProps = {
  readonly shapeWaist: string;
  readonly shoulder: string;
  readonly hip: string;
  readonly bust: string;
};

export const MemberBodyShape = ({
  bust,
  shapeWaist,
  shoulder,
  hip,
}: TProps) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>体型</StyledTableCell>
            <StyledTableCell>タイプ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              <Typography fontWeight="bold" variant="subtitle2" p={1}>
                肩幅のタイプ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>{shoulder}</Typography>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <Typography fontWeight="bold" variant="subtitle2" p={1}>
                胸板のタイプ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>{bust}</Typography>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <Typography fontWeight="bold" variant="subtitle2" p={1}>
                お腹周りのタイプ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>{shapeWaist}</Typography>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <Typography fontWeight="bold" variant="subtitle2" p={1}>
                ヒップのタイプ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>{hip}</Typography>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
