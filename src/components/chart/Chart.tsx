import { ListItem, ListItemText, Typography } from "@mui/material";
import { CoordinateContainer } from "../coordinate/CoordinateContainer";

type TProps = {
  readonly id: number;
  readonly rentalStartedAt: string | null;
  readonly index: number;
};

export const Chart = ({ id, rentalStartedAt, index }: TProps) => {
  return (
    <ListItem key={index}>
      <ListItemText>
        <Typography variant="h6">カルテID: {id}</Typography>
        <Typography variant="body2" style={{ color: "gray" }}>
          発送日:
          {rentalStartedAt
            ? new Date(rentalStartedAt!).toLocaleDateString()
            : ""}
        </Typography>
        <br />
        <CoordinateContainer chartId={id} />
      </ListItemText>
    </ListItem>
  );
};
