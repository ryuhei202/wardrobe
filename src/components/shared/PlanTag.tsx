import { Paper, Typography } from "@mui/material";

type Props = {
  readonly color: "uwear" | "leeap" | "plain";
  readonly name: string;
};

export const PlanTag = ({ color, name }: Props) => {
  const getBackgroundColor = () => {
    switch (color) {
      case "uwear":
        return "#E8E7DF";
      case "leeap":
        return "#00266F";
      case "plain":
        return "#333333";
    }
  };

  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: getBackgroundColor(),
        textAlign: "center",
      }}
    >
      <Typography variant="h5" color={color === "uwear" ? "#4C5257" : "white"}>
        {name}
      </Typography>
    </Paper>
  );
};
