import { Paper, Toolbar } from "@mui/material";
import { Arrange } from "../../components/selecting/arrange/Arrange";
import { BrowseContainer } from "../../components/selecting/browse/BrowseContainer";
import { useSelectingHandler } from "../../components/selecting/handler/UseSelectingHandler";
import { SelectionConfirmContainer } from "../../components/selecting/SelectionConfirmContainer";
import { SelectionProgress } from "../../components/selecting/SelectionProgress";
import { useSelectingStyle } from "../../components/selecting/style/UseSelectingStyle";
import { TCoordinateFootwearsShowResponse } from "../../model/api/response/styling/coordinateFootwear/TCoordianteFootwearsShowResponse";
import { CoordinateItemsIndexResponse } from "../../model/api/response/styling/coordinateItem/CoordinateItemsIndexResponse";
import { MainContentType } from "../../model/selecting/MainContentType";

type Props = {
  readonly defaultItemNum: number;
  readonly coordinateItemsIndexResponse: CoordinateItemsIndexResponse;
  readonly coordinateFootwearShowData: TCoordinateFootwearsShowResponse;
};

export const Selecting = ({
  defaultItemNum,
  coordinateItemsIndexResponse,
  coordinateFootwearShowData,
}: Props) => {
  const classes = useSelectingStyle();
  const handler = useSelectingHandler(
    defaultItemNum,
    coordinateItemsIndexResponse,
    coordinateFootwearShowData
  );

  let mainContent;
  switch (handler.mainContentType) {
    case MainContentType.Browse: {
      mainContent = (
        <div className={classes.selecting}>
          <BrowseContainer
            callback={handler.itemBrowseCallback()}
            currentSelectedItemId={handler.currentSelectedItem()?.id ?? null}
          />
          <Paper className={classes.selectionProgress}>
            <SelectionProgress
              data={handler.selectionProgressData()}
              callback={handler.selectionProgressCallback()}
            />
          </Paper>
        </div>
      );
      break;
    }
    case MainContentType.Confirm: {
      mainContent = (
        <SelectionConfirmContainer
          data={handler.selectionConfirmData()}
          callback={handler.selectionConfirmCallback()}
        />
      );
      break;
    }
    case MainContentType.Arrange: {
      mainContent = (
        <Arrange
          data={handler.arrangeData()}
          callback={handler.arrangeCallback()}
        />
      );
      break;
    }
  }

  return (
    <>
      <Toolbar />
      {mainContent}
    </>
  );
};
