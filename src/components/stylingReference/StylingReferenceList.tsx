import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { LatestStylingReferenceShowResponse } from "../../model/api/response/styling/latestStylingReference/LatestStylingReferenceShowResponse";

type Props = {
  readonly response: LatestStylingReferenceShowResponse[];
};

export const StylingReferenceList = (props: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          style={{ backgroundColor: "#f5f5f5" }}
          sx={{ minWidth: 200 }}
          size="small"
        >
          <TableBody>
            {props.response.map((stylingReference) => (
              <TableRow key={stylingReference.id}>
                <TableCell component="th" scope="row">
                  {stylingReference.categoryName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {stylingReference.choices.map((choice) => `${choice} `)}
                  {stylingReference.texts.map((text) => text)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
