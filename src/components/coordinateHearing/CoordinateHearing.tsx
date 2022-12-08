import { List, ListItem, ListSubheader, Typography } from "@mui/material";
import { CoordinateHearingsShowResponse } from "../../model/api/response/styling/coordinateHearing/CoordinateHearingsShowResponse";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
type TProps = {
  readonly hearingData: CoordinateHearingsShowResponse;
};

export const CoordinateHearing = ({ hearingData }: TProps) => {
  return (
    <>
      <Typography>
        {hearingData.isSameBeforeHearing ? (
          <>
            <CheckBoxIcon color="success" />
            <span style={{ verticalAlign: "top" }}>前回と同じ</span>
          </>
        ) : (
          <>
            <FeedbackIcon color="info" />
            <span style={{ verticalAlign: "top" }}>ヒアリングが必要です</span>
          </>
        )}
      </Typography>
      <List dense>
        {hearingData.categorizedHearings.map((hearing) => (
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
    </>
  );
};
