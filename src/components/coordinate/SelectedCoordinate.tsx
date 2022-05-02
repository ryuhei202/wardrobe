import { Divider, List, ListItem } from "@mui/material";
import { Coordinate } from "../../model/api/response/styling/coordinate/Coordinate";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  coordinate: Coordinate;
};

export const SelectedCoordinate = ({ coordinate }: TProps) => {
  return (
    <>
      <ListItem key={coordinate.id}>
        <List dense>
          {coordinate.items.map((item) => (
            <ListItem key={item.id}></ListItem>
          ))}
        </List>
        <Divider variant="middle" />
        <SelectedReviewContainer coordinateId={coordinate.id} />
      </ListItem>
    </>
  );
};
