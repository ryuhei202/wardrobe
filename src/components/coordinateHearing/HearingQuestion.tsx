import { Typography } from "@mui/material";

type TProps = {
  readonly question: {
    readonly title: string;
    readonly answers: {
      readonly name: string;
      readonly text: string | null;
    }[];
  };
};

export const HearingQuestion = ({ question }: TProps) => {
  return (
    <>
      <Typography variant="h5">{question.title}</Typography>
      <Typography variant="body1">
        {question.answers
          .map((answer) => {
            if (answer.text) return `${answer.name}(${answer.text})`;
            return answer.name;
          })
          .join("、")}
      </Typography>
    </>
  );
};
