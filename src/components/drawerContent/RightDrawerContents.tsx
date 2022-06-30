import { List, ListItem, Typography } from "@mui/material";
import { useDrawerContentsStyle } from "./style/UseDrawerContentsStyle";
import { Coordinate } from "../coordinate/Coordinate";
import { PastChartsSection } from "../chart/PastChartsSection";

type TProps = {
  readonly coordinateId?: number;
};

export const RightDrawerContents = ({ coordinateId }: TProps) => {
  const classes = useDrawerContentsStyle();

  return (
    <List dense className={classes.leftDrawerList}>
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
