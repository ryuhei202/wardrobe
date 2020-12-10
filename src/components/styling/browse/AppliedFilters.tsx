import { Button } from "@material-ui/core";

import React from "react";
import Filter from "../../../model/styling/browse/Filter";
import Refinement from "../../../model/styling/browse/Refinement";
import AppliedFiltersCallback from "./callback/AppliedFiltersCallback";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface AppliedFiltersProps {
  data: Refinement;
  callback: AppliedFiltersCallback;
}

const AppliedFilters = (props: AppliedFiltersProps) => {
  const classes = useBrowseStyle();

  const mapAllButtons = (filters: Filter[]): JSX.Element[] => {
    return filters.map((filter) => (
      <Button variant="contained" color="secondary" className={classes.button}>
        {filter.name}
      </Button>
    ));
  };

  let categoryButtton;
  if (props.data.smallCategories.length) {
    categoryButtton = mapAllButtons(props.data.smallCategories);
  } else if (props.data.mediumCategory) {
    categoryButtton = (
      <Button variant="contained" color="secondary" className={classes.button}>
        {props.data.mediumCategory.name}
      </Button>
    );
  } else if (props.data.largeCategory) {
    categoryButtton = (
      <Button variant="contained" color="secondary" className={classes.button}>
        {props.data.largeCategory.name}
      </Button>
    );
  }
  return (
    <>
      {categoryButtton}
      {mapAllButtons(props.data.sizes)}
      {mapAllButtons(props.data.colors)}
      {mapAllButtons(props.data.patterns)}
      {mapAllButtons(props.data.logos)}
      {mapAllButtons(props.data.options)}
      <Button
        variant="contained"
        color="primary"
        onClick={props.callback.onClear}
        className={classes.button}
      >
        全ての条件を解除
      </Button>
    </>
  );
};

export default AppliedFilters;
