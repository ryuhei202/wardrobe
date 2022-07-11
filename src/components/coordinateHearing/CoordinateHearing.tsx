import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { CoordinateHearingsShowResponse } from "../../model/api/response/styling/coordinateHearing/CoordinateHearingsShowResponse";

type TProps = {
  readonly hearings: CoordinateHearingsShowResponse[];
};

export const CoordinateHearing = ({ hearings }: TProps) => {
  return (
    <Box>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", padding: "10px 0" }}
      >
        ヒアリング
      </Typography>
      {hearings.map((hearing, index) => (
        <Box sx={{ marginBottom: "1em" }} key={index}>
          <Fragment key={hearing.hearingCategory}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {hearing.hearingCategory}
            </Typography>
            {hearing.hearingQuestions.map((question) => (
              <Box
                sx={{
                  margin: "0 1em",
                  backgroundColor: "#F5F5F5",
                  padding: "0.5em 1em",
                }}
                key={question.title}
              >
                <Typography variant="body1">{question.title}</Typography>
                <Typography variant="body1" style={{ margin: "0" }}>
                  →
                  {question.answers
                    .map((answer) => {
                      if (answer.text) return `${answer.name}(${answer.text})`;
                      return answer.name;
                    })
                    .join("、")}
                </Typography>
              </Box>
            ))}
          </Fragment>
        </Box>
      ))}
    </Box>
  );
};
