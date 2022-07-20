import { CircularProgress, Typography } from "@mui/material";
import { ItemBrowseCallback } from "../callback/ItemBrowseCallback";
import { Browse } from "../Browse";
import { useBrowsesSearchPrerequisite } from "../../../../hooks/api/UseBrowsesSearchPrerequisite";

export interface CategoryChoiceProvider {
  browseComponent: (
    callback: ItemBrowseCallback,
    previousSelectedItemId: number | null
  ) => JSX.Element;
}

export const useCategoryChoiceProvider = (): CategoryChoiceProvider => {
  const { data, error } = useBrowsesSearchPrerequisite();

  const browseComponent = (
    callback: ItemBrowseCallback,
    currentSelectedItemId: number | null
  ): JSX.Element => {
    if (!data) {
      return <CircularProgress />;
    } else if (error) {
      return <Typography>{error.message}</Typography>;
    } else if (data) {
      return (
        <Browse
          response={data}
          callback={callback}
          currentSelectedItemId={currentSelectedItemId}
        />
      );
    } else {
      return <></>;
    }
  };

  return {
    browseComponent,
  };
};
