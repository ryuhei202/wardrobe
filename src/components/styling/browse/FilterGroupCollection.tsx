import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import FilterChoiceResponse from "../../../model/api/response/styling/browse/FilterChoiceResponse";
import Refinement from "../../../model/styling/browse/Refinement";
import FilterGroupCollectionCallback from "./callback/FilterGroupCollectionCallback";
import FilterCategoryGroup from "./FilterCategoryGroup";
import FilterMediaGroup from "./FilterMediaGroup";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterSizeGroup from "./FilterSizeGroup";
import { useFilterGroupCollectionHandler } from "./handler/UseFilterGroupCollectionHandler";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface FilterGroupCollectionProps {
  data: FilterChoiceResponse;
  callback: FilterGroupCollectionCallback;
  refinement: Refinement;
}

const FilterGroupCollection = (props: FilterGroupCollectionProps) => {
  const classes = useBrowseStyle();

  const handler = useFilterGroupCollectionHandler(props.callback);

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
              data={props.data.largeCategory}
              selected={props.refinement}
              callback={handler.filterCategoryGroupCallback}
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
          <FilterSizeGroup
            data={props.data.size}
            selected={props.refinement.sizes}
            callback={handler.onSizeChanged}
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
          <FilterMediaGroup
            labelIdPrefix="color-checkbox-list-label-"
            data={props.data.color}
            selected={props.refinement.colors}
            callback={handler.onColorChanged}
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
          <FilterMediaGroup
            labelIdPrefix="pattern-checkbox-list-label-"
            data={props.data.pattern}
            selected={props.refinement.patterns}
            callback={handler.onPatternChanged}
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
          <FilterMediaGroup
            labelIdPrefix="logo-checkbox-list-label-"
            data={props.data.logo}
            selected={props.refinement.logos}
            callback={handler.onLogoChanged}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter6a-content"
          id="filter6a-header"
        >
          <Typography className={classes.heading}>その他</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterCheckboxGroup
            labelIdPrefix="option-checkbox-list-label-"
            data={props.data.option}
            selected={props.refinement.options}
            callback={handler.onOptionChanged}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterGroupCollection;
