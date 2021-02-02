import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import FilterGroupCollectionCallback from "./callback/FilterGroupCollectionCallback";
import FilterCategoryGroup from "./FilterCategoryGroup";
import FilterMediaArray from "./FilterMediaArray";
import FilterCheckboxArray from "./FilterCheckboxArray";
import FilterSizeArray from "./FilterSizeArray";
import { useBrowseStyle } from "./style/UseBrowseStyle";
import FilterGroupCollectionData from "../../../model/styling/browse/props_data/FilterGroupCollectionData";
import FilterSliderArray from "./FilterSliderArray";

interface FilterGroupCollectionProps {
  data: FilterGroupCollectionData;
  callback: FilterGroupCollectionCallback;
}

const FilterGroupCollection = (props: FilterGroupCollectionProps) => {
  const classes = useBrowseStyle();

  return (
    <div className={classes.filterPaper}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter1a-content"
          id="filter1a-header"
        >
          <Typography className={classes.heading}>カテゴリー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav">
            <FilterCategoryGroup
              data={props.data.categoryData}
              callback={props.callback.categoryCallback}
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
          <Typography className={classes.heading}>サイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterSizeArray
            data={props.data.sizeData}
            callback={props.callback.sizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography className={classes.heading}>部位数値</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterSliderArray
            data={props.data.partSizeData}
            callback={props.callback.partSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter3a-content"
          id="filter3a-header"
        >
          <Typography className={classes.heading}>カラー</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="color-checkbox-list-label-"
            data={props.data.colorData}
            callback={props.callback.colorCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter4a-content"
          id="filter4a-header"
        >
          <Typography className={classes.heading}>柄</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="pattern-checkbox-list-label-"
            data={props.data.patternData}
            callback={props.callback.patternCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter5a-content"
          id="filter5a-header"
        >
          <Typography className={classes.heading}>ロゴ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterMediaArray
            labelIdPrefix="logo-checkbox-list-label-"
            data={props.data.logoData}
            callback={props.callback.logoCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography className={classes.heading}>ドロップサイズ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="drop-size-checkbox-list-label-"
            data={props.data.dropSizeData}
            callback={props.callback.dropSizeCallback}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter7a-content"
          id="filter7a-header"
        >
          <Typography className={classes.heading}>その他</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxArray
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.optionData}
            callback={props.callback.optionCallback}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterGroupCollection;
