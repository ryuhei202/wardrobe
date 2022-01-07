import { Refinement } from "../../../model/selecting/browse/Refinement";
import { BrowseDetailCallback } from "./callback/BrowseDetailCallback";
import { useBrowseDetailProvider } from "./provider/UseBrowseDetailProvider";

export interface BrowseDetailContainerProps {
  id: number;
  refinement: Refinement;
  callback: BrowseDetailCallback;
  currentSelectedItemId: number | null;
}

export const BrowseDetailContainer = (props: BrowseDetailContainerProps) => {
  const browseDetailProvider = useBrowseDetailProvider(
    props.id,
    props.refinement
  );
  return (
    <>
      {browseDetailProvider.browseDetailComponent(
        props.callback,
        props.currentSelectedItemId
      )}
    </>
  );
};
