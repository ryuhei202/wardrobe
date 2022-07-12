import { List, ListItem, ListSubheader, Typography } from "@mui/material";
import { CoordinateHearingsShowResponse } from "../../model/api/response/styling/coordinateHearing/CoordinateHearingsShowResponse";

type TProps = {
  readonly hearings: CoordinateHearingsShowResponse[];
};

export const CoordinateHearing = ({ hearings }: TProps) => {
  return (
    <List dense>
      {hearings.map((hearing) => (
        <div key={hearing.hearingCategory}>
          <ListSubheader>{hearing.hearingCategory}</ListSubheader>
          {hearing.hearingQuestions.map((question) => (
            <ListItem key={question.title} divider style={{ width: "100%" }}>
              <Typography
                variant="body2"
                display="inline"
                style={{ flexGrow: 1 }}
              >
                {question.title}
              </Typography>
              <Typography
                variant="body2"
                display="inline"
                style={{ fontWeight: "bold" }}
              >
                {question.answers
                  .map((answer) => {
                    if (answer.text) return `${answer.name}(${answer.text})`;
                    return answer.name;
                  })
                  .join("、")}
              </Typography>
            </ListItem>
          ))}
        </div>
      ))}
    </List>
  );
};
