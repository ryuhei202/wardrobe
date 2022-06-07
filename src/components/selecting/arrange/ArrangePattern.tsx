import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Snackbar,
} from "@mui/material";

import { useCoordinatePatternsBulkUpdate } from "../../../hooks/api/UseCoordinatePatternsBulkUpdate";
import { CoordinatePatternIndexResponse } from "../../../model/api/response/styling/coordinatePattern/CoordinatePatternIndexResponse";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { AddedOutfitList } from "./AddedOutfitList";
import { useArrangePatternHandler } from "./handler/UseArragePatternHandler";
import { OutfitForm } from "./OutfitForm";
import { useArrangePatternStyle } from "./style/UseArrangePatternStyle";

export interface ArrangePatternProps {
  data: ArrangeData;
  coordinateId: number;
  response: CoordinatePatternIndexResponse;
}

export const ArrangePattern = (props: ArrangePatternProps) => {
  const classes = useArrangePatternStyle();
  const handler = useArrangePatternHandler(props.data.items, props.response);
  const { mutate, isLoading, isSuccess } = useCoordinatePatternsBulkUpdate({
    coordinatePatterns: handler.coordinates,
    coordinateId: props.coordinateId,
  });

  return (
    <Box sx={{ display: "grid" }}>
      <Button
        variant="contained"
        color="primary"
        className={classes.completeButton}
        onClick={() =>
          mutate(undefined, {
            onSuccess: () => {
              handler.onPostComplete();
            },
          })
        }
      >
        登録を完了する
      </Button>
      <AddedOutfitList
        data={handler.addedOutfitListData()}
        callback={handler.addedOutfitListCallback()}
      />
      {handler.editingOutfitIndex >= 0 ? (
        <OutfitForm
          data={handler.outfitFormData()}
          response={props.response.adviceCategories}
          callback={handler.outfitFormCallback()}
        />
      ) : (
        <></>
      )}
      <Dialog open={isLoading} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Snackbar open={isSuccess} autoHideDuration={6000}>
        <Alert severity="success">
          着こなしアドバイスの登録を完了しました！
        </Alert>
      </Snackbar>
    </Box>
  );
};
