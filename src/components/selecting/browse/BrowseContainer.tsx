import { CircularProgress, Typography } from "@mui/material";
import { useBrowsesSearchPrerequisite } from "../../../hooks/api/UseBrowsesSearchPrerequisite";
import { Browse } from "./Browse";
import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";

export interface BrowseContainerProps {
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

export const BrowseContainer = (props: BrowseContainerProps) => {
  const { data, error } = useBrowsesSearchPrerequisite();

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <Browse
      response={data}
      callback={props.callback}
      currentSelectedItemId={props.currentSelectedItemId}
    />
  );
};
