import { Divider, List, ListItem } from "@mui/material";
import { CoordinatePattern } from "../../model/api/response/styling/coordinatePattern/CoordinatePattern";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  coordinatePattern: CoordinatePattern;
};

export const SelectedCoordinate = ({ coordinatePattern }: TProps) => {
  return (
    <>
      <ListItem key={coordinatePattern.id}>
        <List dense>
          {coordinatePattern.items.map((item) => (
            <ListItem key={item.id}></ListItem>
          ))}
        </List>
        <Divider variant="middle" />
        <SelectedReviewContainer coordinateId={coordinatePattern.id} />
      </ListItem>
    </>
  );
};
