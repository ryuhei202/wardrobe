import { ItemBrowseCallback } from "./callback/ItemBrowseCallback";
import { useCategoryChoiceProvider } from "./provider/UseCategoryChoiceProvider";

export interface BrowseContainerProps {
  callback: ItemBrowseCallback;
  currentSelectedItemId: number | null;
}

export const BrowseContainer = (props: BrowseContainerProps) => {
  const categoryChoiceProvider = useCategoryChoiceProvider();
  return (
    <>
      {categoryChoiceProvider.browseComponent(
        props.callback,
        props.currentSelectedItemId
      )}
    </>
  );
};
