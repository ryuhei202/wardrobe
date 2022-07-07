import { Paper, Toolbar } from "@mui/material";
import { Arrange } from "../../components/selecting/arrange/Arrange";
import { BrowseContainer } from "../../components/selecting/browse/BrowseContainer";
import { useSelectingHandler } from "../../components/selecting/handler/UseSelectingHandler";
import { SelectionConfirmContainer } from "../../components/selecting/SelectionConfirmContainer";
import { SelectionProgress } from "../../components/selecting/SelectionProgress";
import { useSelectingStyle } from "../../components/selecting/style/UseSelectingStyle";
import { CoordinateItemsIndexResponse } from "../../model/api/response/styling/coordinateItem/CoordinateItemsIndexResponse";
import { KarteShowResponse } from "../../model/api/response/styling/karte/KarteShowResponse";
import { MainContentType } from "../../model/selecting/MainContentType";

type Props = {
  readonly karteShowResponse: KarteShowResponse;
  readonly coordinateItemsIndexResponse: CoordinateItemsIndexResponse;
};

export const Selecting = ({
  karteShowResponse,
  coordinateItemsIndexResponse,
}: Props) => {
  const classes = useSelectingStyle();
  const handler = useSelectingHandler(
    karteShowResponse,
    coordinateItemsIndexResponse
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
