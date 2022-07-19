import { List, ListItem, ListItemText } from "@mui/material";
import { Coordinate } from "../coordinate/Coordinate";
import { PastChartsSection } from "../chart/PastChartsSection";

type TProps = {
  readonly coordinateId?: number;
};

export const RightDrawerContents = ({ coordinateId }: TProps) => {
  return (
    <List
      dense
      style={{
        maxWidth: 360,
      }}
    >
      {coordinateId && (
        <>
          <ListItem>
            <ListItemText>コーデ情報</ListItemText>
          </ListItem>
          <Coordinate coordinateId={coordinateId} />
        </>
      )}
      <PastChartsSection />
    </List>
  );
};
