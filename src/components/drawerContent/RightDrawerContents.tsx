import { List, ListItem, Typography } from "@mui/material";
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
          <Typography>コーデ情報</Typography>
          <Coordinate coordinateId={coordinateId} />
        </>
      )}
      <ListItem>
        <PastChartsSection />
      </ListItem>
    </List>
  );
};
