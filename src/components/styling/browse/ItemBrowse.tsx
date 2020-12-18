import BrowseDetailContainer from "./BrowseDetailContainer";
import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useItemBrowseHandler } from "./handler/UseItemBrowseHandler";
import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

export interface ItemBrowseProps {
  callback: ItemBrowseCallback;
}

const ItemBrowse = (props: ItemBrowseProps) => {
  const handler = useItemBrowseHandler(props.callback);

  const refinementChoiceProvider = useRefinementChoiceProvider();

  if (handler.selectedPreregisteredItemId) {
    return (
      <BrowseDetailContainer
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

export default ItemBrowse;
