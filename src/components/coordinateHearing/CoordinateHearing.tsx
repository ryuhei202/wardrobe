import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { CoordinateHearingsShowResponse } from "../../model/api/response/styling/coordinateHearing/CoordinateHearingsShowResponse";

type TProps = {
  readonly hearings: CoordinateHearingsShowResponse[];
};

export const CoordinateHearing = ({ hearings }: TProps) => {
  return (
    <>
      {hearings.map((hearing) => (
        <Fragment key={hearing.hearingCategory}>
          <Typography>{hearing.hearingCategory}</Typography>
          <TableContainer>
            <Table
              style={{ backgroundColor: "#f5f5f5" }}
              sx={{ minWidth: 200 }}
              size="small"
            >
              <TableBody>
                {hearing.hearingQuestions.map((question) => (
                  <TableRow key={question.title}>
                    <TableCell scope="row">{question.title}</TableCell>
                    <TableCell component="th" scope="row">
                      {question.answers
                        .map((answer) => {
                          if (answer.text)
                            return `${answer.name}(${answer.text})`;
                          return answer.name;
                        })
                        .join("、")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ))}
    </>
  );
};
