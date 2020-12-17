import BrowseDetailCallback from "./callback/BrowseDetailCallback";
import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import { useBrowseDetailProvider } from "./provider/UseBrowseDetailProvider";
import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

export interface ItemBrowseProps {
  callback: ItemBrowseCallback;
}

const ItemBrowse = (props: ItemBrowseProps) => {
  const handler = useItemBrowseHandler(props.callback);

  const refinementChoiceProvider = useRefinementChoiceProvider();

  if (handler.selectedPreregisteredItemId) {
    return (
      <BrowseDetailComponent
        id={handler.selectedPreregisteredItemId}
        callback={handler.browseDetailCallback()}
      />
    );
  } else {
    return (
      <>
        {refinementChoiceProvider.browseIndexComponent(
          handler.browseIndexCallback()
        )}
      </>
    );
  }
};

const BrowseDetailComponent = (props: {
  id: number;
  callback: BrowseDetailCallback;
}) => {
  const browseDetailProvider = useBrowseDetailProvider(props.id);
  return <>{browseDetailProvider.browseDetailComponent(props.callback)}</>;
};

export default ItemBrowse;
