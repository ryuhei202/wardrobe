import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChartItemIndexResponse } from "../../model/api/response/styling/chartItem/ChartItemIndexResponse";

type TProps = {
  readonly chartItemsData: ChartItemIndexResponse;
};

export const NgChartItemForm = ({ chartItemsData }: TProps) => {
  return (
    <Box
      sx={{
        width: 400,
        marginBottom: 4,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography align="left">対象アイテム</Typography>
      <FormControl>
        <RadioGroup row>
          {chartItemsData.chartItems.map((chartItem) => (
            <FormControlLabel
              value={chartItem.id}
              control={<Radio />}
              label={<img src={chartItem.imagePaths.thumb ?? undefined} />}
              labelPlacement="bottom"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
