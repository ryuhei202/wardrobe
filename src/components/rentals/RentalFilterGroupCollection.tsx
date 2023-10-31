import { ExpandMore, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { TRentalFilterGroupCollectionData } from "../../model/selecting/browse/props_data/FilterGroupCollectionData";
import { FilterCategoryGroup } from "../selecting/browse/FilterCategoryGroup";
import { FilterCheckboxArray } from "../selecting/browse/FilterCheckboxArray";
import { FilterFormalRank } from "../selecting/browse/FilterFormalRank";
import { FilterMediaArray } from "../selecting/browse/FilterMediaArray";
import { FilterPartSize } from "../selecting/browse/FilterPartSize";
import { FilterSizeArray } from "../selecting/browse/FilterSizeArray";
import { TRentalFilterGroupCollectionCallback } from "../selecting/browse/callback/FilterGroupCollectionCallback";
import { useFilterGroupCollectionStyle } from "../selecting/browse/style/UseFilterGroupCollectionStyle";

type TProps = {
  filterCollection: TRentalFilterGroupCollectionData;
  callback: TRentalFilterGroupCollectionCallback;
};
export const RentalFilterGroupCollection = ({ filterCollection, callback }: TProps) => {
  const classes = useFilterGroupCollectionStyle();
  return (
    <div className={classes.filterPaper}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter1a-content"
          id="filter1a-header"
        >
          <Typography variant="body2">カテゴリー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense component="nav">
            <FilterCategoryGroup
              data={filterCollection.categoryData}
              callback={callback.categoryCallback}
            />
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter2a-content"
          id="filter2a-header"
        >
          <Typography variant="body2">サイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterSizeArray data={filterCollection.sizeData} callback={callback.sizeCallback} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">部位数値</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.partSize}>
          <FilterPartSize
            data={filterCollection.partSizeData}
            callback={callback.partSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter3a-content"
          id="filter3a-header"
        >
          <Typography variant="body2">カラー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="color-checkbox-list-label-"
            data={filterCollection.colorData}
            callback={callback.colorCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter4a-content"
          id="filter4a-header"
        >
          <Typography variant="body2">柄</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="pattern-checkbox-list-label-"
            data={filterCollection.patternData}
            callback={callback.patternCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter5a-content"
          id="filter5a-header"
        >
          <Typography variant="body2">ロゴ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="logo-checkbox-list-label-"
            data={filterCollection.logoData}
            callback={callback.logoCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography variant="body2">ドロップサイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="drop-size-checkbox-list-label-"
            data={filterCollection.dropSizeData}
            callback={callback.dropSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography variant="body2">キレイ度</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.partSize}>
          <FilterFormalRank
            data={filterCollection.formalRankData}
            onChange={callback.formalRankCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">ランク</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={filterCollection.rankData}
            callback={callback.rankCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography variant="body2">その他</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={filterCollection.optionData}
            callback={callback.optionCallback}
          />
        </AccordionDetails>
      </Accordion>
      <TextField
        className={classes.idSearch}
        label="アイテムID"
        InputProps={{ startAdornment: <Search /> }}
        color="secondary"
        type="number"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyPress={(event: any) => {
          if (event.key === "Enter") {
            callback.onItemIdChanged(event.target.value as number);
          }
        }}
      ></TextField>
    </div>
  );
};
